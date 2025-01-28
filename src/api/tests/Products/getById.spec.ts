import { STATUS_CODES } from '../../../data/api/statusCodes';
import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation';
import { productResponseSchema } from '../../../data/jsonSchemas/product.schema';
import { generateRandomId } from '../../../utils/id/radnomId';
import { test, expect } from '../../../fixtures/apiServices.fixture';

test.describe('[API] [Products] Get product by Id', async function () {
  test.beforeEach(async function ({ signInApiService, productApiService }) {
    const token = await signInApiService.signInAsAdmin();
    await productApiService.create(token);
  });

  test.afterEach(async function ({ signInApiService, productApiService }) {
    await productApiService.delete(signInApiService.getToken());
  });

  test('Should get product by existing Id', async function ({
    signInApiService,
    productApiService,
    productsController
  }) {
    const getProductResponse = await productsController.get(
      productApiService.getCreatedProduct()._id,
      signInApiService.getToken()
    );
    const body = getProductResponse.body;
    validateResponse(getProductResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(productResponseSchema, getProductResponse);
    const product = body.Product;
    expect(product).toMatchObject({ ...productApiService.getCreatedProduct() });
  });

  test('Should return 404 error for valid but non existing Id', async function ({
    signInApiService,
    productsController
  }) {
    const nonExistentId = generateRandomId();
    const getProductResponse = await productsController.get(nonExistentId, signInApiService.getToken());
    expect(getProductResponse.status).toBe(STATUS_CODES.NOT_FOUND);
  });

  test.skip('Should return 400 error for invalid Id', async function ({ signInApiService, productsController }) {
    const invalidId = 'invalidId';
    const getProductResponse = await productsController.get(invalidId, signInApiService.getToken());
    expect(getProductResponse.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  test('Should return 401 error for invalid token', async function ({ productApiService, productsController }) {
    const invalidToken = '';
    const getProductResponse = await productsController.get(productApiService.getCreatedProduct()._id, invalidToken);
    expect(getProductResponse.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
  });
});
