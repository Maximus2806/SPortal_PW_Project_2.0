import { test } from '../../fixtures/apiServices.fixture';

test.setTimeout(240 * 1000);

test('Clear orders, products, customers from server', async ({
  signInApiService,
  productApiService,
  customersApiService,
  ordersApiService
}) => {
  const token = await signInApiService.signInAsAdmin();

  const ordersId = (await ordersApiService.getAll({}, token)).map((order) => order._id);
  for (const id of ordersId) {
    await ordersApiService.delete(id, token);
  }

  const productsIds = (await productApiService.getAll({}, token)).map((product) => product._id);
  for (const id of productsIds) {
    await productApiService.delete(id, token);
  }

  const customersIds = (await customersApiService.getAll({}, token)).map((customer) => customer._id);
  for (const id of customersIds) {
    await customersApiService.delete(id, token);
  }
});
