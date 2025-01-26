import { apiConfig } from '../../config/apiConfig';
import { IProduct, IProductResponse, IProductsResponse } from '../../data/types/product.types';
import { IRequestOptions } from '../../data/types/api.types';
import { IGetAllParams } from '../../data/types/api.types';
import { AxiosApiClient } from '../apiClients/axios.apiClient';
import { logStep } from '../../utils/reporter/logStep';

class ProductsController {
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
  async getAll(token: string, params: IGetAllParams = {}) {
    const { manufacturer, search, sortField, sortOrder } = params;
    let url = apiConfig.endpoints.Products + '/';
    const queryParams = [];
    if (manufacturer) queryParams.push(`manufacturer=${manufacturer}`);
    if (search) queryParams.push(`search=${search}`);
    if (sortField) queryParams.push(`sortField=${sortField}`);
    if (sortOrder) queryParams.push(`sortOrder=${sortOrder}`);

    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }
    const options: IRequestOptions = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      // url: apiConfig.endpoints.Products,
      url: url,
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

export default new ProductsController();
