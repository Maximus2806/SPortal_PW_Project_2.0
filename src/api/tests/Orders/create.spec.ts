import _ from 'lodash';
import { IOrder, IOrderRequest } from '../../../data/types/orders/orders.types';
import { test, expect } from '../../../fixtures/apiServices.fixture';
import { ICustomerFromResponse } from '../../../data/types/customers/customers.types';
import { TAGS } from '../../../data/tags';
import { STATUS_CODES } from '../../../data/api/statusCodes';

test.describe('[API] [Orders] Create order [Positive]', async function () {
  let order: IOrder, customer: ICustomerFromResponse, token: string;
  test.beforeEach(async function ({ customersApiService }) {
    customer = await customersApiService.create();
  });

  test(
    'Should create an order for a customer and one product',
    { tag: [TAGS.SMOKE] },
    async function ({ ordersApiService, productApiService }) {
      await productApiService.populateProducts(1);
      const productIds = productApiService.getCreatedProductsIds();
      order = await ordersApiService.create({ customer: customer._id, products: productIds });
      expect(order.customer).toMatchObject({ ...customer });
      expect(order.products.length).toBe(productIds.length);
    }
  );

  test(
    'Should create an order for a customer and multiple products',
    { tag: [TAGS.SMOKE] },
    async function ({ ordersApiService, productApiService }) {
      await productApiService.populateProducts(5);
      const productIds = productApiService.getCreatedProductsIds();
      order = await ordersApiService.create({ customer: customer._id, products: productIds });
      expect(order.customer).toMatchObject({ ...customer });
      expect(order.products.length).toBe(productIds.length);
    }
  );

  test(
    'Should create an order with same products',
    { tag: [TAGS.SMOKE] },
    async function ({ ordersApiService, productApiService }) {
      const product = await productApiService.create();
      const productIds = [product._id, product._id, product._id];
      order = await ordersApiService.create({ customer: customer._id, products: productIds });
      expect(order.customer).toMatchObject({ ...customer });
      expect(order.products.length).toBe(productIds.length);
    }
  );

  test.afterEach('Delete created data', async function ({ ordersApiService, customersApiService, productApiService }) {
    await ordersApiService.delete(order._id);
    await customersApiService.delete(customer._id);
    await productApiService.delete();
  });
});

test.describe('[API] [Orders] Create order [Negative]', async function () {
  let token: string;

  test.beforeAll(async function ({ signInApiService }) {
    token = await signInApiService.signInAsAdmin();
  });
  test(
    'Should not create an order without customer',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersApiService, productApiService, ordersController }) {
      await productApiService.populateProducts(1);
      const productIds = productApiService.getCreatedProductsIds();
      const order = await ordersController.create({ products: productIds } as IOrderRequest, token);
      expect(order.status).toBe(STATUS_CODES.BAD_REQUEST);
    }
  );

  test(
    'Should not create an order without products',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersApiService, customersApiService, ordersController }) {
      const customer = await customersApiService.create();
      const order = await ordersController.create({ customer: customer._id } as IOrderRequest, token);
      expect(order.status).toBe(STATUS_CODES.BAD_REQUEST);
    }
  );
});
