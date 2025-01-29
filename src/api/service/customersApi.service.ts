import { expect } from '@playwright/test';
import { generateNewCustomer } from '../../data/customers/generateCustomer';
import { STATUS_CODES } from '../../data/api/statusCodes';
import { ICustomer } from '../../data/types/customers.types';
import { CustomersController } from '../controllers/customers.controller';
import { logStep } from '../../utils/reporter/logStep';
import { IGetAllCustomersParams } from '../../data/types/api.types';
import { SignInApiService } from './signInApiService.service';
import { validateResponse } from '../../utils/validation/apiValidation';

export class CustomersApiService {
  constructor(
    private customersController = new CustomersController(),
    private signInApiService = new SignInApiService()
  ) {}

  @logStep()
  async create(customerData?: Partial<ICustomer>, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.customersController.create(authToken, generateNewCustomer(customerData));
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    return response.body.Customer;
  }

  @logStep()
  async delete(id: string, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.customersController.delete(authToken, id);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  }

  @logStep()
  async get(id: string, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.customersController.get(authToken, id);
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Customer;
  }

  @logStep()
  async getAll(params: IGetAllCustomersParams = {}, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.customersController.getAll(authToken, params);
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Customers;
  }

  @logStep()
  async update(id: string, customerData: ICustomer, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.customersController.update(authToken, id, customerData);
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Customer;
  }

  @logStep()
  async getOrders(id: string, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.customersController.getOrders(authToken, id);
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Orders;
  }
}
