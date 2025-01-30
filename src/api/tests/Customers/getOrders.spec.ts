import { test, expect } from '../../../fixtures/apiServices.fixture';

test.describe('[API] [Customers] [Get orders]', async function () {
  test('Should get all orders', async function ({ customersApiService }) {
    const customerId = (await customersApiService.create())._id;
    const allOrdersResponse = await customersApiService.getOrders(customerId);
    expect(allOrdersResponse.length).not.toBeGreaterThan(0);
  });
});
