import { apiConfig } from '../../config/apiConfig';
import { IRequestOptions } from '../../data/types/api.types';
import { IOrderRequest, IOrderResponse } from '../../data/types/orders.types';
import { AxiosApiClient } from '../apiClients/axios.apiClient';

export class OrdersController {
  constructor(private apiClient = new AxiosApiClient()) {}

  async create(token: string, body: IOrderRequest) {
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
}

//TODO the rest endpoints for orders
