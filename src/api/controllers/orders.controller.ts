import { ContentType } from 'allure-js-commons';
import { apiConfig } from '../../config/apiConfig';
import { IRequestOptions } from '../../data/types/api.types';
import { AxiosApiClient } from '../apiClients/axios.apiClient';
import { convertRequestParams } from '../../utils/convert-request-params';
import { IOrderDelivery, IOrderRequest, IOrderResponse, IOrdersResponse } from '../../data/types/orders/orders.types';

export class OrdersController {
  constructor(private apiClient = new AxiosApiClient()) {}

  async create(body: IOrderRequest, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints['Orders'],
      method: 'post',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: body
    };
    return await this.apiClient.send<IOrderResponse>(options);
  }

  async update(id: string, body: IOrderRequest, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints['Get Order By Id'](id),
      method: 'put',
      headers: { 'Content-Type': ContentType.JSON, Authorization: `Bearer ${token}` },
      data: body
    };
    return await this.apiClient.send<IOrderResponse>(options);
  }

  async getAll(params = {}, token: string) {
    let urlParams = '';
    if (params) {
      urlParams = convertRequestParams(params as Record<string, string>);
    }
    const options: IRequestOptions = {
      method: 'get',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints['Orders'] + urlParams,
      headers: { 'Content-Type': ContentType.JSON, Authorization: `Bearer ${token}` }
    };
    return await this.apiClient.send<IOrdersResponse>(options);
  }

  async delete(id: string, token: string) {
    const options: IRequestOptions = {
      method: 'delete',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints['Get Order By Id'](id),
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': ContentType.JSON }
    };
    return await this.apiClient.send(options);
  }

  async updateDelivery(id: string, deliveryDetails: IOrderDelivery, token: string) {
    const options: IRequestOptions = {
      method: 'post',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints['Order Delivery'](id),
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': ContentType.JSON },
      data: deliveryDetails
    };
    return await this.apiClient.send<IOrderResponse>(options);
  }

  async markAsReceived(id: string, token: string) {
    const options: IRequestOptions = {
      method: 'post',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints['Order Received'](id),
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': ContentType.JSON }
    };
    return await this.apiClient.send<IOrderResponse>(options);
  }

  async updateOrderStatus(id: string, status: string, token: string) {
    const options: IRequestOptions = {
      method: 'put',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints['Order Status'](id),
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': ContentType.JSON },
      data: { status }
    };
    return await this.apiClient.send<IOrderResponse>(options);
  }

  async addComments(id: string, comment: string, token: string) {
    const options: IRequestOptions = {
      method: 'post',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints['Order Comments'](id),
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': ContentType.JSON },
      data: { comment }
    };
    return await this.apiClient.send<IOrderResponse>(options);
  }

  async deleteComments(id: string, commentId: string, token: string) {
    const options: IRequestOptions = {
      method: 'delete',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints['Order Comments'](id) + commentId,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': ContentType.JSON }
    };
    return await this.apiClient.send(options);
  }
}
