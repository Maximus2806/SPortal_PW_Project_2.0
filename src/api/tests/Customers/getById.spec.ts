import { STATUS_CODES } from '../../../data/api/statusCodes';
import { generateRandomId } from '../../../utils/id/radnomId';
import { test, expect } from '../../../fixtures/apiServices.fixture';

test.describe('[API] [Customers] Get customer by Id', async function () {
  test.beforeEach(async function ({ customersApiService, signInApiService }) {
    await signInApiService.signInAsAdmin();
    await customersApiService.create();
  });

  test.afterEach(async function ({ customersApiService }) {
    await customersApiService.delete();
  });

  test('Should get customer by existing Id', async function ({ customersApiService }) {
    const customer = await customersApiService.get(customersApiService.getCreatedCustomer()._id);
    expect(customer).toMatchObject({ ...customersApiService.getCreatedCustomer() });
  });

  test('Should return 404 error for valid but non existing Id', async function ({
    signInApiService,
    customersController
  }) {
    const nonExistentId = generateRandomId();
    const getCustomerResponse = await customersController.get(signInApiService.getToken(), nonExistentId);
    expect(getCustomerResponse.status).toBe(STATUS_CODES.NOT_FOUND);
  });

  test('Should return 400 error for invalid Id', async function ({ signInApiService, customersController }) {
    const invalidId = 'invalidId';
    const getCustomerResponse = await customersController.get(signInApiService.getToken(), invalidId);
    expect(getCustomerResponse.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  test('Should return 401 error for invalid auth token', async function ({ customersApiService, customersController }) {
    const invalidToken = '';
    const getCustomerResponse = await customersController.get(
      invalidToken,
      customersApiService.getCreatedCustomer()._id
    );
    expect(getCustomerResponse.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
  });

  test('Should return 401 error for expired auth token', async function ({ customersApiService, customersController }) {
    const expiredToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTA0OTkzYWFlNDQwMTg0YWY2NDc3YiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTczODQyOTM1MiwiZXhwIjoxNzM4NTE1NzUyfQ.SZYTOwqpb51CtlznhFe66_YX9H6KARX9VBkQWW3eIv4';
    const getCustomerResponse = await customersController.get(
      expiredToken,
      customersApiService.getCreatedCustomer()._id
    );
    expect(getCustomerResponse.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
  });
});
