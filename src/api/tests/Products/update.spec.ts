import { STATUS_CODES } from '../../../data/api/statusCodes';
import { generateProductData } from '../../../data/Products/generateProduct';
import ProductsController from '../../controllers/products.controller';
import { generateRandomId } from '../../../utils/id/radnomId';
import { SignInApiService } from '../../service/signInApiService.service';
import productApiService from '../../service/productApiService.service';
import { expect, test } from 'playwright/test';

test.describe('[API] [Products] Update', async function () {
  const signInApiService = new SignInApiService();
  let id = '';

  test.beforeEach(async function () {
    await signInApiService.signInAsAdmin();
    // const productData = generateProductData();//
    // const createProductResponse = await ProductsController.create(productData, signInApiService.getToken());//
    // expect(createProductResponse.status).toBe(STATUS_CODES.CREATED);//
    const createdProduct = await productApiService.create(signInApiService.getToken());
    // const body = createProductResponse.body;
    // const body = createdProduct.
    id = createdProduct._id;
  });

  test.afterEach(async function () {
    await productApiService.delete(signInApiService.getToken());
  });

  test('Should update product with smoke data', async function () {
    const updatedProduct = await productApiService.update(id, signInApiService.getToken());
    const getUpdatedProductResponse = await ProductsController.get(id, signInApiService.getToken());
    const product = getUpdatedProductResponse.body.Product;
    expect(updatedProduct).toEqual({ ...product });
  });

  test('Should return 404 error for valid but non existing Id', async function () {
    const producNewtData = generateProductData();
    const nonExistentId = generateRandomId();
    const updatedProductResponse = await ProductsController.update(
      nonExistentId,
      producNewtData,
      signInApiService.getToken()
    );
    expect(updatedProductResponse.status).toBe(STATUS_CODES.NOT_FOUND);
  });

  test.skip('Should return 400 error for invalid Id', async function () {
    const producNewtData = generateProductData();
    const invalidId = 'invalidId';
    const updatedProductResponse = await ProductsController.update(
      invalidId,
      producNewtData,
      signInApiService.getToken()
    );
    expect(updatedProductResponse.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  test('Should return 401 error for invalid token', async function () {
    const producNewtData = generateProductData();
    const invalidToken = '';
    const updatedProductResponse = await ProductsController.update(id, producNewtData, invalidToken);
    expect(updatedProductResponse.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
  });
});
