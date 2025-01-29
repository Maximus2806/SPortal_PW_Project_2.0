import { generateNewCustomer } from '../../../data/customers/generateCustomer';
import { test, expect } from '../../../fixtures/apiServices.fixture';

test.describe('[API] [Customers] [Update Customer]', async function () {
  let customerId: string;
  test.beforeEach(async function ({ customersApiService }) {
    const customerData = generateNewCustomer();
    customerId = (await customersApiService.create(customerData))._id;
  });
  test.afterEach(async function ({ customersApiService }) {
    await customersApiService.delete(customerId);
  });
  test('Should update customer with valid data', async function ({ customersApiService }) {
    const newCustomerData = generateNewCustomer();
    const createCustomerResponse = await customersApiService.update(customerId, newCustomerData);
    expect(createCustomerResponse).toMatchObject({
      ...newCustomerData
    });
  });
});
