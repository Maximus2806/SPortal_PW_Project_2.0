import { IOrder, IOrderRequest } from '../../../data/types/orders/orders.types';
import { test, expect } from '../../../fixtures/apiServices.fixture';
import { ICustomerFromResponse } from '../../../data/types/customers/customers.types';
import { TAGS } from '../../../data/tags';
import { STATUS_CODES } from '../../../data/api/statusCodes';
import { generateRandomId } from '../../../utils/id/radnomId';
import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation';
import { createOrderSchema } from '../../../data/jsonSchemas/createOrder.shcema';

test.describe('[API] [Orders] Update order', async function () {
  let order: IOrder, customer: ICustomerFromResponse, token: string;
  test.beforeAll(async function ({ signInApiService }) {
    token = await signInApiService.signInAsAdmin();
  });
  test.beforeEach(async function ({ customersApiService, productApiService, ordersApiService }) {
    customer = await customersApiService.create();
    await productApiService.populateProducts(1);
    const productIds = productApiService.getCreatedProductsIds();
    order = await ordersApiService.create({ customer: customer._id, products: productIds });
  });

  test.afterEach('Delete created data', async function ({ ordersApiService, customersApiService, productApiService }) {
    await ordersApiService.delete(order._id);
    await customersApiService.delete(customer._id);
    await productApiService.delete();
  });

  test(
    'Should update an order with new customer and another product',
    { tag: [TAGS.SMOKE] },
    async function ({ customersApiService, productApiService, ordersController }) {
      const newCustomer = await customersApiService.create();
      const newProduct = await productApiService.create();
      const newProductIds = [newProduct._id];
      const newOrder: IOrderRequest = {
        customer: newCustomer._id,
        products: newProductIds
      };
      const updatedOrder = await ordersController.update(order._id, newOrder, token);
      expect(updatedOrder.status).toBe(STATUS_CODES.OK);
      validateResponse(updatedOrder, STATUS_CODES.OK, true, null);
      validateJsonSchema(createOrderSchema, updatedOrder);
      expect(updatedOrder.body.Order.customer).toMatchObject({ ...newCustomer });
      expect(updatedOrder.body.Order.products.length).toBe(newProductIds.length);
    }
  );

  test(
    'Should add new products to an order',
    { tag: [TAGS.SMOKE] },
    async function ({ productApiService, ordersController }) {
      await productApiService.populateProducts(2);
      const newProductIds = productApiService.getCreatedProductsIds();
      const newOrder: IOrderRequest = {
        customer: order.customer._id,
        products: newProductIds
      };
      const updatedOrder = await ordersController.update(order._id, newOrder, token);
      expect(updatedOrder.status).toBe(STATUS_CODES.OK);
      validateResponse(updatedOrder, STATUS_CODES.OK, true, null);
      validateJsonSchema(createOrderSchema, updatedOrder);
      expect(updatedOrder.body.Order.customer).toMatchObject({ ...order.customer });
      expect(updatedOrder.body.Order.products.length).toBe(newProductIds.length);
    }
  );

  test(
    'Should update an order with the same data in request',
    { tag: [TAGS.SMOKE] },
    async function ({ ordersController, productApiService }) {
      const productIds = productApiService.getCreatedProductsIds();
      const newOrder: IOrderRequest = {
        customer: order.customer._id,
        products: order.products.map((product) => product._id)
      };
      const updatedOrder = await ordersController.update(order._id, newOrder, token);
      expect(updatedOrder.status).toBe(STATUS_CODES.OK);
      validateResponse(updatedOrder, STATUS_CODES.OK, true, null);
      validateJsonSchema(createOrderSchema, updatedOrder);
      expect(updatedOrder.body.Order.customer).toMatchObject({ ...order.customer });
      expect(updatedOrder.body.Order.products.length).toBe(productIds.length);
    }
  );

  test(
    'Should not update an order with empty products array',
    { tag: [TAGS.SMOKE] },
    async function ({ productApiService, ordersController }) {
      const newOrder: IOrderRequest = {
        customer: order.customer._id,
        products: []
      };
      const updatedOrder = await ordersController.update(order._id, newOrder, token);
      expect(updatedOrder.status).toBe(STATUS_CODES.BAD_REQUEST);
    }
  );

  test(
    'Should not update an order with invalid order id',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const newOrder: IOrderRequest = {
        customer: order.customer._id,
        products: order.products.map((product) => product._id)
      };
      const updatedOrder = await ordersController.update(generateRandomId(), newOrder, token);
      expect(updatedOrder.status).toBe(STATUS_CODES.NOT_FOUND);
    }
  );

  test(
    'Should not update an order without providing id',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const newOrder: IOrderRequest = {
        customer: order.customer._id,
        products: order.products.map((product) => product._id)
      };
      const updatedOrder = await ordersController.update('', newOrder, token);
      expect(updatedOrder.status).toBe(STATUS_CODES.NOT_FOUND);
    }
  );

  test(
    'Should not update an order with invalid customer id',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const newOrder: IOrderRequest = {
        customer: generateRandomId(),
        products: order.products.map((product) => product._id)
      };
      const updatedOrder = await ordersController.update(order._id, newOrder, token);
      expect(updatedOrder.status).toBe(STATUS_CODES.NOT_FOUND);
    }
  );

  test(
    'Should not update an order without cusomer id',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const newOrder = {
        products: order.products.map((product) => product._id)
      };
      const updatedOrder = await ordersController.update(order._id, newOrder as IOrderRequest, token);
      expect(updatedOrder.status).toBe(STATUS_CODES.BAD_REQUEST);
    }
  );

  test(
    'Should not update an order without products array',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const newOrder = {
        customer: order.customer._id
      };
      const updatedOrder = await ordersController.update(order._id, newOrder as IOrderRequest, token);
      expect(updatedOrder.status).toBe(STATUS_CODES.BAD_REQUEST);
    }
  );

  test(
    'Should update an order ignoring additional parameter in request',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const productIds = order.products.map((product) => product._id);
      const newOrder = {
        customer: order.customer._id,
        products: productIds,
        additional: 'additional'
      };
      const updatedOrder = await ordersController.update(order._id, newOrder, token);
      expect(updatedOrder.status).toBe(STATUS_CODES.OK);
      validateResponse(updatedOrder, STATUS_CODES.OK, true, null);
      validateJsonSchema(createOrderSchema, updatedOrder);
      expect(updatedOrder.body.Order.customer).toMatchObject({ ...order.customer });
      expect(updatedOrder.body.Order.products.length).toBe(productIds.length);
    }
  );

  test('Should not update an order without token', { tag: [TAGS.REGRESSION] }, async function ({ ordersController }) {
    const newOrder: IOrderRequest = {
      customer: order.customer._id,
      products: order.products.map((product) => product._id)
    };
    const updatedOrder = await ordersController.update(order._id, newOrder, '');
    expect(updatedOrder.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
  });

  test(
    'Should return 401 error when creating an order with expired token',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const newOrder: IOrderRequest = {
        customer: order.customer._id,
        products: order.products.map((product) => product._id)
      };
      const expiredToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTA0OTkzYWFlNDQwMTg0YWY2NDc3YiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTczODQyOTM1MiwiZXhwIjoxNzM4NTE1NzUyfQ.SZYTOwqpb51CtlznhFe66_YX9H6KARX9VBkQWW3eIv4';
      const updatedOrder = await ordersController.update(order._id, newOrder, expiredToken);
      expect(updatedOrder.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
    }
  );
});
