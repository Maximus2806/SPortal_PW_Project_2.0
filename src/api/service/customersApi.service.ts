import { expect } from '@playwright/test';
import { generateNewCustomer } from '../../data/customers/generateCustomer';
import { STATUS_CODES } from '../../data/api/statusCodes';
import { ICustomer, ICustomerFromResponse } from '../../data/types/customers/customers.types';
import { CustomersController } from '../controllers/customers.controller';
import { logStep } from '../../utils/reporter/logStep';
import { IGetAllCustomersParams } from '../../data/types/api.types';
import { SignInApiService } from './signInApiService.service';
import { validateResponse } from '../../utils/validation/apiValidation';
import { CUSTOMER_SORT_FIELDS, SORT_ORDER } from '../../data/types/sortFields.type';

export class CustomersApiService {
  private createdCusomer: ICustomerFromResponse | null = null;
  constructor(
    private customersController = new CustomersController(),
    private signInApiService = new SignInApiService()
  ) {}

  getCreatedCustomer() {
    if (!this.createdCusomer) {
      throw new Error('Customer was not created');
    }
    return this.createdCusomer;
  }

  @logStep()
  async create(customerData?: Partial<ICustomer>, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.customersController.create(authToken, generateNewCustomer(customerData));
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    this.createdCusomer = response.body.Customer;
    return response.body.Customer;
  }

  @logStep()
  async delete(id?: string, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const customerId = id || this.getCreatedCustomer()._id;
    const response = await this.customersController.delete(authToken, customerId);
    expect(response.status).toBe(STATUS_CODES.DELETED);
    this.createdCusomer = null;
  }

  @logStep()
  async deleteCustomerWithEmail(email: string, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const customerId = (await this.getCustomersWithSearch(email))[0]._id;
    if (!customerId) {
      throw new Error(`Customer with email "${email}" not found`);
    }
    await this.delete(customerId, authToken);
  }

  @logStep()
  async getCustomersWithSearch(searchValue: string) {
    const customers = await this.getAll({ search: searchValue });
    return customers;
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

  @logStep()
  async validateSearchResults(params: { search: string }) {
    const response = await this.getAll({ search: params.search });
    if (response.length === 0) {
      console.log(`Search by "${params.search}" has no results`);
    }
    response.forEach(() => {
      const lowerSearch = params.search.toLocaleLowerCase();
      response.forEach(({ email, name, country }) => {
        expect([email, name, country].some((field) => field.toLocaleLowerCase().includes(lowerSearch))).toBe(true);
      });
    });
    return response.length;
  }

  async validateSorting(customers: ICustomerFromResponse[], sortField: CUSTOMER_SORT_FIELDS, sortOrder: SORT_ORDER) {
    const sortedValues = customers.map((c) => c[sortField]);
    const expectedSortedValues = [...sortedValues].sort((a, b) =>
      sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    );
    expect(sortedValues).toEqual(expectedSortedValues);
  }
}
