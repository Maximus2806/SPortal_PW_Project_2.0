import { apiConfig } from '../../config/apiConfig';
import { IProduct, IProductResponse, IProductsResponse } from '../../data/types/products/product.types';
import { IRequestOptions } from '../../data/types/api.types';
import { AxiosApiClient } from '../apiClients/axios.apiClient';
import { logStep } from '../../utils/reporter/logStep';
import { convertRequestParams } from '../../utils/convert-request-params';
import { IGetAllProducsParams } from '../../data/types/products/productSortFields';

export class ProductsController {
  constructor(private apiClient = new AxiosApiClient()) {}

  @logStep('Create product via API')
  async create(productData: IProduct, token: string) {
    const options: IRequestOptions = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: productData,
      url: apiConfig.endpoints.Products,
      baseURL: apiConfig.baseUrl
    };
    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep('Get product via API')
  async get(productId: string, token: string) {
    const options: IRequestOptions = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      url: apiConfig.endpoints['Get Product By Id'](productId),
      baseURL: apiConfig.baseUrl
    };
    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep('Get all products via API')
  async getAll(params: IGetAllProducsParams = {}, token: string) {
    let urlParams = '';
    if (params) {
      urlParams = convertRequestParams(params as Record<string, string>);
    }

    const options: IRequestOptions = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      url: apiConfig.endpoints.Products + urlParams,
      baseURL: apiConfig.baseUrl
    };
    return await this.apiClient.send<IProductsResponse>(options);
  }

  @logStep('Update product via API')
  async update(productId: string, productData: IProduct, token: string) {
    const options: IRequestOptions = {
      method: 'put',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: productData,
      url: apiConfig.endpoints['Get Product By Id'](productId),
      baseURL: apiConfig.baseUrl
    };
    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep('Delete product via API')
  async delete(productId: string, token: string) {
    const options: IRequestOptions = {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      url: apiConfig.endpoints['Get Product By Id'](productId),
      baseURL: apiConfig.baseUrl
    };
    return await this.apiClient.send(options);
  }
}
