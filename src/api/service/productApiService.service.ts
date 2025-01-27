import { expect } from 'playwright/test';
import { STATUS_CODES } from '../../data/api/statusCodes';
import { productResponseSchema } from '../../data/jsonSchemas/product.schema';
import { generateProductData } from '../../data/products/generateProduct';
import { IProduct, IProductFromResponse } from '../../data/types/product.types';
import { validateJsonSchema, validateResponse } from '../../utils/validation/apiValidation';
import { ProductsController } from '../controllers/products.controller';
import { IGetAllParams } from '../../data/types/api.types';

export class ProductApiService {
  private createdProduct: IProductFromResponse | null = null;
  constructor(private controller = new ProductsController()) {}

  async create(token: string, customData?: Partial<IProduct>) {
    const response = await this.controller.create(generateProductData(customData), token);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    validateJsonSchema(productResponseSchema, response);
    this.createdProduct = response.body.Product;
    return response.body.Product;
  }

  async update(id: string, token: string, customData?: Partial<IProduct>) {
    const producNewtData = generateProductData(customData);
    const updatedProductResponse = await this.controller.update(id, producNewtData, token);
    expect(updatedProductResponse.status).toBe(STATUS_CODES.OK);
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

  async delete(token: string) {
    const response = await this.controller.delete(this.getCreatedProduct()._id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
    this.createdProduct = null;
  }

  async getAll(token: string, params: IGetAllParams = {}) {
    const response = await this.controller.getAll(token, params);
    expect(response.status).toBe(STATUS_CODES.OK);
    expect(response.body.IsSuccess).toBe(true);
    expect(response.body.ErrorMessage).toBe(null);
    return response.body.Products;
  }
}
