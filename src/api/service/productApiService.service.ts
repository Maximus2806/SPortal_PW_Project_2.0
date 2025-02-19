import { expect } from 'playwright/test';
import { STATUS_CODES } from '../../data/api/statusCodes';
import { productResponseSchema } from '../../data/jsonSchemas/product.schema';
import { IProduct, IProductFromResponse, MANUFACTURERS } from '../../data/types/products/product.types';
import { validateJsonSchema, validateResponse } from '../../utils/validation/apiValidation';
import { ProductsController } from '../controllers/products.controller';
import { SignInApiService } from './signInApiService.service';
import { generateProductData } from '../../data/productss/generateProduct';
import { IGetAllProducsParams } from '../../data/types/products/productSortFields';

export class ProductApiService {
  private createdProducts: IProductFromResponse[] = [];
  constructor(
    private controller = new ProductsController(),
    private signInApiService = new SignInApiService()
  ) {}

  async create(customData?: Partial<IProduct>, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.controller.create(generateProductData(customData), authToken);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    validateJsonSchema(productResponseSchema, response);
    this.createdProducts.push(response.body.Product);
    return response.body.Product;
  }

  async populateProducts(amount: number, customData?: Partial<IProduct>, token?: string) {
    for (let i = 0; i < amount; i++) {
      await this.create(customData, token);
    }
  }

  async update(id: string, customData?: Partial<IProduct>, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const producNewtData = generateProductData(customData);
    const updatedProductResponse = await this.controller.update(id, producNewtData, authToken);
    const udpdatedProductBody = updatedProductResponse.body.Product;
    validateResponse(updatedProductResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(productResponseSchema, updatedProductResponse);
    expect(udpdatedProductBody, `Should update product with id '${id}'`).toMatchObject({ ...producNewtData });
    return udpdatedProductBody;
  }

  getCreatedProduct() {
    if (!this.createdProducts.length) throw new Error('No product was created');
    return this.createdProducts.at(-1);
  }

  getCreatedProducts() {
    if (!this.createdProducts.length) throw new Error('No product was created');
    return this.createdProducts;
  }

  getCreatedProductsIds() {
    if (!this.createdProducts.length) throw new Error('No product was created');
    return this.createdProducts.map((p) => p._id);
  }

  async delete(id?: string, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    if (id) {
      const response = await this.controller.delete(id, authToken);
      expect(response.status, `Should delete product with id '${id}'`).toBe(STATUS_CODES.DELETED);
      return;
    }

    for (const product of this.createdProducts) {
      const response = await this.controller.delete(product._id, authToken);
      expect(response.status, `Should delete product with id '${product._id}'`).toBe(STATUS_CODES.DELETED);
    }
    this.createdProducts = [];
  }

  async deleteProductWithName(productName: string, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const productID = (await this.getProductsWithSearch(productName)).at(-1)?._id;
    await this.delete(productID, authToken);
  }

  async getAll(params: IGetAllProducsParams = {}, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.controller.getAll(params, authToken);
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Products;
  }

  async getProductsWithManufacturer(manufacturers: string | MANUFACTURERS | (string | MANUFACTURERS)[]) {
    const products = await this.getAll({ manufacturer: manufacturers });
    return products;
  }

  async getProductsWithSearch(searchValue: string) {
    const products = await this.getAll({ search: searchValue });
    return products;
  }

  async getProductsWithSortFieldAndOrder({
    sortField,
    sortOrder
  }: Partial<Pick<IGetAllProducsParams, 'sortField' | 'sortOrder'>>) {
    const products = await this.getAll({ sortField, sortOrder });
    return products;
  }

  async getById(id: string, token?: string) {
    const authToken = token || (await this.signInApiService.signInAsAdmin());
    const response = await this.controller.get(id, authToken);
    validateResponse(response, STATUS_CODES.OK, true, null);
    return response.body.Product;
  }
}
