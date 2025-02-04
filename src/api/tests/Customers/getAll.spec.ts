import { test, expect } from '../../../fixtures/apiServices.fixture';
import { COUNTRIES } from '../../../data/customers/countries';
import { STATUS_CODES } from '../../../data/api/statusCodes';
import { faker } from '@faker-js/faker';
import { testCustomers } from '../../../data/api/Customers/customersForSearch';
import { CUSTOMER_SORT_FIELDS, SORT_ORDER } from '../../../data/types/sortFields.type';

test.describe('[API] [Customers] [Get all customers]', async function () {
  test.beforeAll(async function ({ signInApiService }) {
    await signInApiService.signInAsAdmin();
  });

  test('Should get all customers with valid query parameters', async function ({ customersApiService }) {
    const params = {
      country: [
        COUNTRIES.USA,
        COUNTRIES.BELARUS,
        COUNTRIES.RUSSIA,
        COUNTRIES.UKRAINE,
        COUNTRIES.GERMANY,
        COUNTRIES.FRANCE,
        COUNTRIES.GREAT_BRITAIN,
        COUNTRIES.CANADA
      ],
      sortField: 'name',
      sortOrder: 'desc',
      search: 'a'
    };
    await customersApiService.validateSearchResults(params);
  });

  test('Should get all customers without query parameters', async function ({ customersApiService }) {
    const allCustomersResponse = await customersApiService.getAll();
    expect(allCustomersResponse.length).toBeGreaterThan(0);
  });

  test('Should not get customers without providing auth token', async function ({ customersController }) {
    const response = await customersController.getAll('');
    expect(response.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
  });

  test('Should not get customers with expired token', async function ({ customersController }) {
    const expiredToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTA0OTkzYWFlNDQwMTg0YWY2NDc3YiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTczODQyOTM1MiwiZXhwIjoxNzM4NTE1NzUyfQ.SZYTOwqpb51CtlznhFe66_YX9H6KARX9VBkQWW3eIv4';
    const response = await customersController.getAll(expiredToken);
    expect(response.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
  });

  test('Should find customer by full or partial email', async function ({ customersApiService }) {
    const customer = await customersApiService.create();
    try {
      let params = { search: `${customer.email}` };
      await customersApiService.validateSearchResults(params);
      params = params = { search: `${customer.email.split('@')[0]}` };
      await customersApiService.validateSearchResults(params);
    } finally {
      await customersApiService.delete(customer._id);
    }
  });

  test('Should find customer by full or partial name', async function ({ customersApiService }) {
    const customer = await customersApiService.create();
    try {
      let params = { search: `${customer.name}` };
      await customersApiService.validateSearchResults(params);
      params = { search: `${customer.name.slice(0, customer.name.length - 1)}` };
      await customersApiService.validateSearchResults(params);
    } finally {
      await customersApiService.delete(customer._id);
    }
  });

  test('Should find all customers by country', async function ({ customersApiService }) {
    const customer = await customersApiService.create();
    try {
      let params = { search: `${customer.country}` };
      await customersApiService.validateSearchResults(params);
      params = { search: `${customer.country.slice(0, customer.country.length - 1)}` };
      await customersApiService.validateSearchResults(params);
    } finally {
      await customersApiService.delete(customer._id);
    }
  });
  test('Should find customers by coincidense in several fields at the same time', async function ({
    customersApiService
  }) {
    const user1 = {
      name: faker.person.firstName() + 'searchData',
      email: 'anyemail' + Date.now() + '@example.com'
    };
    const user2 = {
      name: faker.person.firstName() + faker.person.lastName(),
      email: 'SearchData' + Date.now() + '@example.com'
    };
    const customer1 = await customersApiService.create(user1);
    const customer2 = await customersApiService.create(user2);
    try {
      const params = { search: `searchData` };
      const countCustomers = await customersApiService.validateSearchResults(params);
      expect(countCustomers).toBe(2);
    } finally {
      await customersApiService.delete(customer1._id);
      await customersApiService.delete(customer2._id);
    }
  });

  test('Should find customers by search term in different fields with case sensitivity check', async function ({
    customersApiService
  }) {
    const createdCustomers = await Promise.all(testCustomers.map((data) => customersApiService.create(data)));
    try {
      const params = { search: 'canada' };

      const countCustomers = await customersApiService.validateSearchResults(params);
      expect(countCustomers).toBeGreaterThanOrEqual(testCustomers.length);
    } finally {
      await Promise.all(createdCustomers.map((c) => customersApiService.delete(c._id)));
    }
  });

  test('Should receive empty array if no customers found', async function ({ customersApiService }) {
    const params = { search: faker.string.alpha(10) };
    const countCustomers = await customersApiService.validateSearchResults(params);
    expect(countCustomers).toBe(0);
  });

  test('Should find customers by single country', async function ({ customersApiService }) {
    const customer1 = await customersApiService.create({ country: COUNTRIES.BELARUS });
    const customer2 = await customersApiService.create({ country: COUNTRIES.USA });

    try {
      const params = { country: [COUNTRIES.BELARUS] };
      const response = await customersApiService.getAll(params);
      expect(response.length).toBeGreaterThan(0);
      response.forEach((c) => expect(c.country).toBe(COUNTRIES.BELARUS));
    } finally {
      await customersApiService.delete(customer1._id);
      await customersApiService.delete(customer2._id);
    }
  });

  test('Should find customers by multiple countries', async function ({ customersApiService }) {
    const allowedCountries = [COUNTRIES.FRANCE, COUNTRIES.GERMANY];
    const customer1 = await customersApiService.create({ country: COUNTRIES.FRANCE });
    const customer2 = await customersApiService.create({ country: COUNTRIES.GERMANY });
    const customer3 = await customersApiService.create({ country: COUNTRIES.USA });

    try {
      const params = { country: allowedCountries };
      const response = await customersApiService.getAll(params);
      expect(response.length).toBeGreaterThan(0);
      response.forEach((c) => expect(allowedCountries).toContain(c.country));
    } finally {
      await customersApiService.delete(customer1._id);
      await customersApiService.delete(customer2._id);
      await customersApiService.delete(customer3._id);
    }
  });

  test('Should filter customers by country and search', async function ({ customersApiService }) {
    const userName = faker.string.alpha(10);
    const customer1 = await customersApiService.create({ name: userName, country: COUNTRIES.CANADA });
    const customer2 = await customersApiService.create({ name: userName, country: COUNTRIES.USA });
    const customer3 = await customersApiService.create({ name: 'RandomUser', country: COUNTRIES.CANADA });

    try {
      const params = { country: [COUNTRIES.CANADA], search: userName };
      const response = await customersApiService.getAll(params);

      expect(response.length).toBe(1);
      expect(response[0].country).toBe(COUNTRIES.CANADA);
      expect(response[0].name).toContain(userName);
    } finally {
      await customersApiService.delete(customer1._id);
      await customersApiService.delete(customer2._id);
      await customersApiService.delete(customer3._id);
    }
  });

  test('Should sort customers by email', async function ({ customersApiService }) {
    const customers = [
      await customersApiService.create({ email: 'z' + Date.now() + '@example.com' }),
      await customersApiService.create({ email: 'a' + Date.now() + '@example.com' }),
      await customersApiService.create({ email: 'g' + Date.now() + '@example.com' })
    ];
    try {
      const params = { sortField: 'name', sortOrder: 'asc' };
      const responseAsc = await customersApiService.getAll(params);
      await customersApiService.validateSorting(responseAsc, CUSTOMER_SORT_FIELDS.EMAIL, SORT_ORDER.ASC);
      params.sortOrder = 'desc';
      const responseDesc = await customersApiService.getAll(params);
      await customersApiService.validateSorting(responseDesc, CUSTOMER_SORT_FIELDS.EMAIL, SORT_ORDER.DESC);
    } finally {
      await Promise.all(customers.map((c) => customersApiService.delete(c._id)));
    }
  });

  test('Should sort customers by name', async function ({ customersApiService }) {
    const customers = [
      await customersApiService.create({ name: faker.string.alpha(10) }),
      await customersApiService.create({ name: faker.string.alpha(10) }),
      await customersApiService.create({ name: faker.string.alpha(10) })
    ];
    try {
      const params = { sortField: 'name', sortOrder: 'asc' };
      const responseAsc = await customersApiService.getAll(params);
      await customersApiService.validateSorting(responseAsc, CUSTOMER_SORT_FIELDS.NAME, SORT_ORDER.ASC);
      params.sortOrder = 'desc';
      const responseDesc = await customersApiService.getAll(params);
      await customersApiService.validateSorting(responseDesc, CUSTOMER_SORT_FIELDS.NAME, SORT_ORDER.DESC);
    } finally {
      await Promise.all(customers.map((c) => customersApiService.delete(c._id)));
    }
  });

  test('Should sort customers by country', async function ({ customersApiService }) {
    const customers = [
      await customersApiService.create({ country: COUNTRIES.USA }),
      await customersApiService.create({ country: COUNTRIES.CANADA }),
      await customersApiService.create({ country: COUNTRIES.GERMANY })
    ];

    try {
      const params = { sortField: 'country', sortOrder: 'asc', search: 'name a' };
      const responseAsc = await customersApiService.getAll(params);
      await customersApiService.validateSorting(responseAsc, CUSTOMER_SORT_FIELDS.COUNTRY, SORT_ORDER.ASC);
      params.sortOrder = 'desc';
      const responseDesc = await customersApiService.getAll(params);
      await customersApiService.validateSorting(responseDesc, CUSTOMER_SORT_FIELDS.COUNTRY, SORT_ORDER.DESC);
    } finally {
      await Promise.all(customers.map((c) => customersApiService.delete(c._id)));
    }
  });

  test('Should sort customers by creation date', async function ({ customersApiService }) {
    const customer1 = await customersApiService.create();
    await new Promise((res) => setTimeout(res, 1000));
    const customer2 = await customersApiService.create();
    await new Promise((res) => setTimeout(res, 1000));
    const customer3 = await customersApiService.create();

    try {
      const params = { sortField: 'createdOn', sortOrder: 'asc' };
      const responseAsc = await customersApiService.getAll(params);
      await customersApiService.validateSorting(responseAsc, CUSTOMER_SORT_FIELDS.CREATED_ON, SORT_ORDER.ASC);
      params.sortOrder = 'desc';
      const responseDesc = await customersApiService.getAll(params);
      await customersApiService.validateSorting(responseDesc, CUSTOMER_SORT_FIELDS.CREATED_ON, SORT_ORDER.DESC);
    } finally {
      await Promise.all([customer1, customer2, customer3].map((c) => customersApiService.delete(c._id)));
    }
  });

  test('Sould not return errors in case query parameters are invalid', async function ({ customersApiService }) {
    const params = { sortField: 'invalidSortField', sortOrder: 'invalidSortOrder' };
    const response = await customersApiService.getAll(params);
    expect(response.length).toBeGreaterThanOrEqual(0);
  });

  test('Should not return errors with empty search query', async function ({ customersApiService }) {
    const params = { search: '' };
    const response = await customersApiService.getAll(params);
    expect(response.length).toBeGreaterThanOrEqual(0);
  });

  test('Should not return errors with long (251 char) search query', async function ({ customersApiService }) {
    const params = {
      search:
        'aaoaglmsfkmqkuhiczgwasifumpxuvyjvqmevmagipbvdewhodnuahzsvdxgrxvpsgtfxbrybwduljapkjyrgoytxyuqdfdkbdhetonvzxxikuhyzeelzgccfmnnqszlxypwkxbsmlxrnsaukipqsjjqxireehfohkfswbzhcydiekvarttmuqtoehhkjcpoamqkbeequnxegatzuwsdexnxxbxbcnrvhyxstezpvsrutmfzvxiwtmurtve'
    };
    const response = await customersApiService.getAll(params);
    expect(response.length).toBeGreaterThanOrEqual(0);
  });
});
