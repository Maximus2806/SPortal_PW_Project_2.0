import { generateNewCustomer } from '../../../data/customers/generateCustomer';
import { STATUS_CODES } from '../../../data/api/statusCodes';
import { test, expect } from '../../../fixtures/apiServices.fixture';

test.describe('[API] [Customers] [Create New Customer]', async function () {
  test('Should create new customer with valid data and services', async function ({
    signInApiService,
    customersController,
    customersApiService
  }) {
    const token = await signInApiService.signInAsAdmin();

    const customerData = generateNewCustomer();

    const createCustomerResponse = await customersController.create(token, customerData);

    expect(createCustomerResponse.status).toBe(STATUS_CODES.CREATED);
    expect(createCustomerResponse.body.IsSuccess).toBe(true);
    expect(createCustomerResponse.body.ErrorMessage).toBe(null);

    expect(createCustomerResponse.body.Customer).toMatchObject({
      ...customerData
    });

    await customersApiService.delete(token, createCustomerResponse.body.Customer._id);
  });
});
