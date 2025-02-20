import _ from 'lodash';
import { IOrder, IOrderRequest } from '../../../data/types/orders/orders.types';
import { test, expect } from '../../../fixtures/apiServices.fixture';
import { ICustomerFromResponse } from '../../../data/types/customers/customers.types';
import { TAGS } from '../../../data/tags';
import { STATUS_CODES } from '../../../data/api/statusCodes';
import { generateRandomId } from '../../../utils/id/radnomId';

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

  test(
    'Should create another order for the same customer',
    { tag: [TAGS.SMOKE] },
    async function ({ ordersApiService, productApiService }) {
      await productApiService.populateProducts(1);
      const productIds = productApiService.getCreatedProductsIds();
      order = await ordersApiService.create({ customer: customer._id, products: productIds });
      const anotherOrder = await ordersApiService.create({ customer: customer._id, products: productIds });
      expect(order.customer).toMatchObject({ ...customer });
      expect(order.products.length).toBe(productIds.length);
      expect(anotherOrder.customer).toMatchObject({ ...customer });
      expect(anotherOrder.products.length).toBe(productIds.length);
      await ordersApiService.delete(anotherOrder._id);
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

  test(
    'Should not create an order with non existing customerId',
    { tag: [TAGS.REGRESSION] },
    async function ({ productApiService, ordersController }) {
      await productApiService.populateProducts(1);
      const productIds = productApiService.getCreatedProductsIds();
      const invalidCustomerId = generateRandomId();
      const order = await ordersController.create(
        { customer: invalidCustomerId, products: productIds } as IOrderRequest,
        token
      );
      expect(order.status).toBe(STATUS_CODES.NOT_FOUND);
    }
  );

  test(
    'Should not create an order with non existing productId',
    { tag: [TAGS.REGRESSION] },
    async function ({ customersApiService, ordersController }) {
      const customer = await customersApiService.create();
      const invalidProductId = generateRandomId();
      const order = await ordersController.create(
        { customer: customer._id, products: [invalidProductId] } as IOrderRequest,
        token
      );
      expect(order.status).toBe(STATUS_CODES.NOT_FOUND);
    }
  );
//skip untill fixed
  test.skip(
    'Should return 400 error when creating an order with invalid customerId',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController, productApiService }) {
      const invalidCustomerId = 'invalidCustomerId';
      await productApiService.populateProducts(1);
      const productIds = productApiService.getCreatedProductsIds();
      const order = await ordersController.create(
        { customer: invalidCustomerId, products: productIds } as IOrderRequest,
        token
      );
      expect(order.status).toBe(STATUS_CODES.BAD_REQUEST);
    }
  );
//skip untill fixed
  test.skip(
    'Should return 400 error when creating an order with invalid productId',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController, customersApiService }) {
      const invalidProductId = 'invalidProductId';
      const customer = await customersApiService.create();
      const order = await ordersController.create(
        { customer: customer._id, products: [invalidProductId] } as IOrderRequest,
        token
      );
      expect(order.status).toBe(STATUS_CODES.BAD_REQUEST);
    }
  );

  test(
    'Should return 401 error when creating an order without token',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController, productApiService, customersApiService }) {
      await productApiService.populateProducts(1);
      const productIds = productApiService.getCreatedProductsIds();
      const customer = await customersApiService.create();
      const order = await ordersController.create(
        { customer: customer._id, products: productIds } as IOrderRequest,
        ''
      );
      expect(order.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
    }
  );

  test(
    'Should return 401 error when creating an order with expired token',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController, productApiService, customersApiService }) {
      await productApiService.populateProducts(1);
      const productIds = productApiService.getCreatedProductsIds();
      const customer = await customersApiService.create();
      const expiredToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTA0OTkzYWFlNDQwMTg0YWY2NDc3YiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTczODQyOTM1MiwiZXhwIjoxNzM4NTE1NzUyfQ.SZYTOwqpb51CtlznhFe66_YX9H6KARX9VBkQWW3eIv4';
      const order = await ordersController.create(
        { customer: customer._id, products: productIds } as IOrderRequest,
        expiredToken
      );
      expect(order.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
    }
  );
});
//test github actions
