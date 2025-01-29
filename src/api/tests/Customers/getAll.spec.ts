import { test, expect } from '../../../fixtures/apiServices.fixture';
import { COUNTRIES } from '../../../data/customers/countries';

test.describe('[API] [Customers] [Get all customers]', async function () {
  test.beforeAll(async function ({ signInApiService }) {
    await signInApiService.signInAsAdmin();
  });
  test('Should get all customers with valid query parameters', async function ({ customersApiService }) {
    const queryParams = {
      country: [COUNTRIES.USA, COUNTRIES.BELARUS],
      sortField: 'name',
      sortOrder: 'desc'
    };
    const allCustomersResponse = await customersApiService.getAll(queryParams);
    expect(allCustomersResponse.length).toBeGreaterThan(0);
  });
});
