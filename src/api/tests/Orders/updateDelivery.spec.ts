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
    customer = await customersApiService.create({}, token);
    await productApiService.populateProducts(1, {}, token);
    const productIds = productApiService.getCreatedProductsIds();
    order = await ordersApiService.create({ customer: customer._id, products: productIds }, token);
  });

  test('Shoud update delivery with random data', { tag: [TAGS.SMOKE] }, async function ({ ordersController }) {
    const deliveryDetails = generateDelivery();
    const updatedOrder = await ordersController.updateDelivery(order._id, deliveryDetails, token);
    expect(updatedOrder.status).toBe(STATUS_CODES.OK);
    validateResponse(updatedOrder, STATUS_CODES.OK, true, null);
    validateJsonSchema(createOrderSchema, updatedOrder);
  });

  orderDeliveryData.forEach(({ description, params, expectedStatus, isSuccess, errorMessage, tags }) => {
    test(`${description}`, { tag: tags }, async function ({ ordersController }) {
      const updatedOrder = await ordersController.updateDelivery(order._id, params as IOrderDelivery, token);
      validateResponse(updatedOrder, expectedStatus, isSuccess, errorMessage);
      if (isSuccess) {
        validateJsonSchema(createOrderSchema, updatedOrder);
      }
    });
  });

  test.afterEach('Delete created data', async function ({ ordersApiService, customersApiService, productApiService }) {
    await ordersApiService.delete(order._id, token);
    await customersApiService.delete(customer._id, token);
    await productApiService.delete('', token);
  });
});
