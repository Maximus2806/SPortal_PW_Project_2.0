import { STATUS_CODES } from '../../../data/api/statusCodes';
import { generateProductData } from '../../../data/products/generateProduct';
import { generateRandomId } from '../../../utils/id/radnomId';
import { test, expect } from '../../../fixtures/apiServices.fixture';

test.describe('[API] [Products] Update', async function () {
  let id = '';
  test.beforeAll(async function ({ signInApiService }) {
    await signInApiService.signInAsAdmin();
  });

  test.beforeEach(async function ({ productApiService }) {
    const createdProduct = await productApiService.create();
    id = createdProduct._id;
  });

  test.afterEach(async function ({ signInApiService, productApiService }) {
    await productApiService.delete(signInApiService.getToken());
  });

  test('Should update product with smoke data', async function ({ productApiService }) {
    const updatedProduct = await productApiService.update(id);
    const getUpdatedProductResponse = await productApiService.getById(id);
    const product = getUpdatedProductResponse;
    expect(updatedProduct).toEqual({ ...product });
  });

  test('Should return 404 error for valid but non existing Id', async function ({
    signInApiService,
    productsController
  }) {
    const producNewtData = generateProductData();
    const nonExistentId = generateRandomId();
    const updatedProductResponse = await productsController.update(
      nonExistentId,
      producNewtData,
      signInApiService.getToken()
    );
    expect(updatedProductResponse.status).toBe(STATUS_CODES.NOT_FOUND);
  });

  test.skip('Should return 400 error for invalid Id', async function ({ signInApiService, productsController }) {
    const producNewtData = generateProductData();
    const invalidId = 'invalidId';
    const updatedProductResponse = await productsController.update(
      invalidId,
      producNewtData,
      signInApiService.getToken()
    );
    expect(updatedProductResponse.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  test('Should return 401 error for invalid token', async function ({ productsController }) {
    const producNewtData = generateProductData();
    const invalidToken = '';
    const updatedProductResponse = await productsController.update(id, producNewtData, invalidToken);
    expect(updatedProductResponse.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
  });
});
