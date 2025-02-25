import { expect } from 'allure-playwright';
import { STATUS_CODES } from '../../data/api/statusCodes';
import { createOrderSchema } from '../../data/jsonSchemas/createOrder.shcema';
import { IOrder, IOrderDelivery, IOrderRequest } from '../../data/types/orders/orders.types';
import { validateJsonSchema, validateResponse } from '../../utils/validation/apiValidation';
import { OrdersController } from '../controllers/orders.controller';
import { SignInApiService } from './signInApiService.service';
import { de } from '@faker-js/faker/.';
import { generateDelivery } from '../../data/orders/generateDelivery';

export class OrdersApiService {
  private createdOrders: IOrder[] = [];

  constructor(
    private ordersController = new OrdersController(),
    private signInApiService = new SignInApiService()
  ) {}

  async create(body: IOrderRequest, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.ordersController.create(body, authToken);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    validateJsonSchema(createOrderSchema, response);
    return response.body.Order;
  }

  async update(id: string, body: IOrderRequest, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.ordersController.update(id, body, authToken);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(createOrderSchema, response);
    return response.body.Order;
  }

  async updateDelivery(id: string, deliveryDetails?: IOrderDelivery, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const details = deliveryDetails || generateDelivery();
    const response = await this.ordersController.updateDelivery(id, details, authToken);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(createOrderSchema, response);
    return response.body.Order;
  }

  async updateStatus(id: string, status: string, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.ordersController.updateOrderStatus(id, status, authToken);
    validateResponse(response, STATUS_CODES.OK, true, null);
    validateJsonSchema(createOrderSchema, response);
    return response.body.Order;
  }

  async getAll(params = {}, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    return (await this.ordersController.getAll(params, authToken)).body.Orders;
  }

  async delete(id: string, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.ordersController.delete(id, authToken);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  }
}
