import { STATUS_CODES } from '../../../data/api/statusCodes';
import { TAGS } from '../../../data/tags';
import { ICustomerFromResponse } from '../../../data/types/customers/customers.types';
import { IProductFromResponse } from '../../../data/types/products/product.types';
import { test, expect } from '../../../fixtures/apiServices.fixture';
import { generateRandomId } from '../../../utils/id/radnomId';

test.describe('[API] [Orders] [Delete Order]', async function () {
  let customer: ICustomerFromResponse, product: IProductFromResponse, token: string;

  test.beforeEach(async function ({ ordersApiService, productApiService, customersApiService, signInApiService }) {
    token = await signInApiService.signInAsAdmin();
    customer = await customersApiService.create();
    product = await productApiService.create();
  });

  test('Should delete an order by id', { tag: [TAGS.SMOKE] }, async function ({ ordersController, ordersApiService }) {
    const order = await ordersApiService.create({ customer: customer._id, products: [product._id] });
    const response = await ordersController.delete(order._id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });

  test(
    'Should return 404 error when deleting an order that does not exist',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const invalidOrderId = generateRandomId();
      const response = await ordersController.delete(invalidOrderId, token);
      expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
    }
  );

  test(
    'Should return 404 error when deleting an order without providing id',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const invalidOrderId = '';
      const response = await ordersController.delete(invalidOrderId, token);
      expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
    }
  );

  test(
    'Should return 400 error when deleting an order with invalid id',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const invalidOrderId = 'invalidOrderId';
      const response = await ordersController.delete(invalidOrderId, token);
      expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
    }
  );

  test(
    'Should return 401 error when deleting an order without token',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const orderId = generateRandomId();
      const response = await ordersController.delete(orderId, '');
      expect(response.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
    }
  );

  test('Should return 401 error when deleting an order with expired token', async function ({ ordersController }) {
    const orderId = generateRandomId();
    const expiredToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTA0OTkzYWFlNDQwMTg0YWY2NDc3YiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTczODQyOTM1MiwiZXhwIjoxNzM4NTE1NzUyfQ.SZYTOwqpb51CtlznhFe66_YX9H6KARX9VBkQWW3eIv4';
    const response = await ordersController.delete(orderId, expiredToken);
    expect(response.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
  });

  test.afterEach('Delete created data', async function ({ ordersApiService, customersApiService, productApiService }) {
    await customersApiService.delete(customer._id);
    await productApiService.delete();
  });
});
