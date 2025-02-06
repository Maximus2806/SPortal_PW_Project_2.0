import { expect } from 'playwright/test';
import { STATUS_CODES } from '../../data/api/statusCodes';
import { productResponseSchema } from '../../data/jsonSchemas/product.schema';
import { generateProductData } from '../../data/products/generateProduct';
import { IProduct, IProductFromResponse } from '../../data/types/product.types';
import { validateJsonSchema, validateResponse } from '../../utils/validation/apiValidation';
import { ProductsController } from '../controllers/products.controller';
import { IGetAllParams } from '../../data/types/api.types';
import { SignInApiService } from './signInApiService.service';

export class ProductApiService {
  private createdProduct: IProductFromResponse | null = null;
  constructor(
    private controller = new ProductsController(),
    private signInApiService = new SignInApiService()
  ) {}

  async create(customData?: Partial<IProduct>, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.controller.create(generateProductData(customData), authToken);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    validateJsonSchema(productResponseSchema, response);
    this.createdProduct = response.body.Product;
    return response.body.Product;
  }

  async update(id: string, customData?: Partial<IProduct>, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const producNewtData = generateProductData(customData);
    const updatedProductResponse = await this.controller.update(id, producNewtData, authToken);
    const udpdatedProductBody = updatedProductResponse.body.Product;
    validateResponse(updatedProductResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(productResponseSchema, updatedProductResponse);
    expect(udpdatedProductBody).toMatchObject({ ...producNewtData });
    return udpdatedProductBody;
  }

  getCreatedProduct() {
    if (!this.createdProduct) throw new Error('No product was created');
    return this.createdProduct;
  }

  async delete(id: string, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.controller.delete(this.getCreatedProduct()._id, authToken);
    expect(response.status).toBe(STATUS_CODES.DELETED);
    this.createdProduct = null;
  }

    // @logStep()
    // async delete(id: string, token?: string) {
    //   const authToken = token || (await this.signInApiService.signInAsAdmin());
    //   const response = await this.customersController.delete(authToken, id);
    //   expect(response.status).toBe(STATUS_CODES.DELETED);
    // }

  async getAll(params: IGetAllParams = {}, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.controller.getAll(authToken, params);
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Products;
  }

  async getById(id: string, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.controller.get(id, authToken);
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Product;
  }
}
