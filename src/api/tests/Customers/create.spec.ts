import { generateNewCustomer } from '../../../data/customers/generateCustomer';
import { test, expect } from '../../../fixtures/apiServices.fixture';

test.describe('[API] [Customers] [Create New Customer]', async function () {
  test('Should create new customer with valid data and services', async function ({ customersApiService }) {
    const customerData = generateNewCustomer();
    const createCustomerResponse = await customersApiService.create(customerData);
    expect(createCustomerResponse).toMatchObject({
      ...customerData
    });
    await customersApiService.delete(createCustomerResponse._id);
  });
});
