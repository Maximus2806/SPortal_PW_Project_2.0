import { apiConfig } from '../../config/apiConfig';
import { IGetAllCustomersParams, IRequestOptions } from '../../data/types/api.types';
import {
  ICustomer,
  ICustomerResponse,
  ICustomersOrdersResponse,
  ICustomersResponse
} from '../../data/types/customers/customers.types';
import { logStep } from '../../utils/reporter/logStep';
import { AxiosApiClient } from '../apiClients/axios.apiClient';

export class CustomersController {
  constructor(private apiClient = new AxiosApiClient()) {}

  @logStep('Create customer via API')
  async create(token: string, body: ICustomer) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.Customers,
      method: 'post',
      data: body,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    return await this.apiClient.send<ICustomerResponse>(options);
  }

  @logStep('Delete customer via API')
  async delete(token: string, id: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints['Customer By Id'](id),
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    return await this.apiClient.send(options);
  }

  @logStep('Get customer via API')
  async get(token: string, id: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints['Customer By Id'](id),
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    return await this.apiClient.send<ICustomerResponse>(options);
  }

  @logStep('Get all customers via API')
  async getAll(token: string, params: IGetAllCustomersParams = {}) {
    const { search, country, sortField, sortOrder } = params;
    const queryParams = new URLSearchParams();

    if (search) queryParams.append('search', search);
    if (sortField) queryParams.append('sortField', sortField);
    if (sortOrder) queryParams.append('sortOrder', sortOrder);
    if (country && country.length > 0) {
      country.forEach((c) => queryParams.append('country', c));
    }

    const url = `${apiConfig.endpoints.Customers}?${queryParams.toString()}`;

    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url,
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    return await this.apiClient.send<ICustomersResponse>(options);
  }

  @logStep('Update customer via API')
  async update(token: string, id: string, body: ICustomer) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints['Customer By Id'](id),
      method: 'put',
      data: body,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    return await this.apiClient.send<ICustomerResponse>(options);
  }

  @logStep('Get customers orders via API')
  async getOrders(token: string, id: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints['Customer By Id'](id) + '/orders',
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    return await this.apiClient.send<ICustomersOrdersResponse>(options);
  }
}
