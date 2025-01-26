//TODO: npm run test -- --spec="./src/api/tests/Products/getAll.test.ts"
import { STATUS_CODES } from '../../../data/api/statusCodes';
import ProductsController from '../../controllers/products.controller';
import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation';
import { allProductsSchema } from '../../../data/jsonSchemas/allProducts.schema';
import { testCases } from '../../../data/api/Products/getAllProducts';
import { SignInApiService } from '../../service/signInApiService.service';
import { expect, test } from 'playwright/test';

test.describe('[API] [Products] Get all products', async function () {
  const signInApiService = new SignInApiService();

  test.beforeEach(async function () {
    await signInApiService.signInAsAdmin();
  });

  testCases.forEach(({ description, params, expectedStatus, isSuccess, errorMessage }) => {
    test(`Should handle query parameters: ${description}`, async function () {
      const getProductsResponse = await ProductsController.getAll(signInApiService.getToken(), params);
      validateResponse(getProductsResponse, expectedStatus, isSuccess, errorMessage);
      if (isSuccess) {
        validateJsonSchema(allProductsSchema, getProductsResponse);
      }
    });
  });

  test('Should return 401 error for invalid token', async function () {
    const invalidToken = '';
    const getProductsResponse = await ProductsController.getAll(invalidToken, {});
    expect(getProductsResponse.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
  });
});
