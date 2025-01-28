import { expect } from '@playwright/test';
import { generateNewCustomer } from '../../data/customers/generateCustomer';
import { STATUS_CODES } from '../../data/api/statusCodes';
import { ICustomer } from '../../data/types/customers.types';
import { CustomersController } from '../controllers/customers.controller';
import { logStep } from '../../utils/reporter/logStep';
import { IGetAllCustomersParams } from '../../data/types/api.types';

export class CustomersApiService {
  constructor(
    private customersController = new CustomersController()
    // private signInApiService = new SignInApiService()
  ) {}

  @logStep()
  async create(token: string, customerData?: Partial<ICustomer>) {
    // const token = await this.signInApiService.getTransformedToken();

    const response = await this.customersController.create(token, generateNewCustomer(customerData));
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(response.body.IsSuccess).toBe(true);
    expect(response.body.ErrorMessage).toBe(null);
    return response.body.Customer;
  }

  @logStep()
  async delete(token: string, id: string) {
    // const token = await this.signInApiService.getTransformedToken();
    const response = await this.customersController.delete(token, id);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  }

  @logStep()
  async get(token: string, id: string) {
    // const token = await this.signInApiService.getTransformedToken();
    const response = await this.customersController.get(token, id);
    expect(response.status).toBe(STATUS_CODES.OK);
    return response.body.Customer;
  }

  @logStep('Get all customers via API and validate response')
  async getAll(token: string, params: IGetAllCustomersParams = {}) {
    const response = await this.customersController.getAll(token, params);
    expect(response.status).toBe(STATUS_CODES.OK);
    expect(response.body.IsSuccess).toBe(true);
    expect(response.body.ErrorMessage).toBe(null);
    return response.body.Customers;
  }
}
