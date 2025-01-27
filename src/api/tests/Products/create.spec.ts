import { STATUS_CODES } from '../../../data/api/statusCodes';
import { generateProductData } from '../../../data/Products/generateProduct';
import ProductsController from '../../controllers/products.controller';
import { SignInApiService } from '../../service/signInApiService.service';
import productApiService from '../../service/productApiService.service';
import { expect, test } from 'playwright/test';

test.describe('[API] [Products] Create', async function () {
  const signInApiService = new SignInApiService();
  let id = '';

  test.beforeEach(async function () {
    await signInApiService.signInAsAdmin();
  });

  test.afterEach(async function () {
    const response = await ProductsController.delete(id, signInApiService.getToken());
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });

  test('Should create product with smoke data', async function () {
    const productData = generateProductData();
    const createdProduct = await productApiService.create(signInApiService.getToken(), productData);
    id = createdProduct._id;
    const getProduct = (await ProductsController.get(id, signInApiService.getToken())).body.Product;
    expect(createdProduct).toMatchObject({ ...getProduct });
  });
});
