import { IOrder, IOrderDelivery } from '../../../data/types/orders/orders.types';
import { test, expect } from '../../../fixtures/apiServices.fixture';
import { ICustomerFromResponse } from '../../../data/types/customers/customers.types';
import { TAGS } from '../../../data/tags';
import { STATUS_CODES } from '../../../data/api/statusCodes';
import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation';
import { createOrderSchema } from '../../../data/jsonSchemas/createOrder.shcema';
import { orderDeliveryData } from '../../../data/api/Orders/orderDeliveryData';
import { generateDelivery } from '../../../data/orders/generateDelivery';

test.describe('[API] [Orders] Update delivery', async function () {
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

  test(
    'Should update order status to In Process',
    { tag: [TAGS.SMOKE] },
    async function ({ ordersController, ordersApiService }) {
      await ordersApiService.updateDelivery(order._id);
      const updateOrderStatusResponse = await ordersController.updateOrderStatus(order._id, 'In Process', token);
      validateResponse(updateOrderStatusResponse, STATUS_CODES.OK, true, null);
      validateJsonSchema(createOrderSchema, updateOrderStatusResponse);
      expect(updateOrderStatusResponse.body.Order.status).toBe('In Process');
    }
  );

  test(
    'Should not update order status to In Process without delivery details',
    { tag: [TAGS.REGRESSION] },
    async function ({ ordersController }) {
      const updatedOrder = await ordersController.updateOrderStatus(order._id, 'In Process', token);
      expect(updatedOrder.status).toBe(STATUS_CODES.BAD_REQUEST);
    }
  );

  test(
    'Should cancel order with Draft status',
    { tag: [TAGS.SMOKE] },
    async function ({ ordersController, ordersApiService }) {
      const updatedOrder = await ordersController.updateOrderStatus(order._id, 'Canceled', token);
      validateResponse(updatedOrder, STATUS_CODES.OK, true, null);
      validateJsonSchema(createOrderSchema, updatedOrder);
      expect(updatedOrder.body.Order.status).toBe('Canceled');
    }
  );

  test(
    'Should cancel order with In Process status',
    { tag: [TAGS.SMOKE] },
    async function ({ ordersController, ordersApiService }) {
      await ordersApiService.updateDelivery(order._id);
      await ordersApiService.updateStatus(order._id, 'In Process');
      const updatedOrder = await ordersController.updateOrderStatus(order._id, 'Canceled', token);
      validateResponse(updatedOrder, STATUS_CODES.OK, true, null);
      validateJsonSchema(createOrderSchema, updatedOrder);
      expect(updatedOrder.body.Order.status).toBe('Canceled');
    }
  );

  test.afterEach('Delete created data', async function ({ ordersApiService, customersApiService, productApiService }) {
    await ordersApiService.delete(order._id, token);
    await customersApiService.delete(customer._id, token);
    await productApiService.delete('', token);
  });
});
