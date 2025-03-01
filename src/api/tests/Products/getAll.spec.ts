import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation';
import { allProductsSchema } from '../../../data/jsonSchemas/allProducts.schema';
import { testCases } from '../../../data/api/Products/getAllProducts';
import { test } from '../../../fixtures/apiServices.fixture';
import { TAGS } from '../../../data/tags';

test.describe('[API] [Products] Get all products', { tag: TAGS.SMOKE }, async function () {
  let token: string;
  test.beforeAll(async function ({ signInApiService }) {
    token = await signInApiService.signInAsAdmin();
  });

  testCases.forEach(({ description, params, expectedStatus, isSuccess, errorMessage }) => {
    test(`Should handle query parameters: ${description}`, async function ({ productsController }) {
      const getProductsResponse = await productsController.getAll(params, token);
      validateResponse(getProductsResponse, expectedStatus, isSuccess, errorMessage);
      if (isSuccess) {
        validateJsonSchema(allProductsSchema, getProductsResponse);
      }
    });
  });

  // test('Should return 401 error for invalid token', async function ({ productsController }) {
  //   const invalidToken = '';
  //   const getProductsResponse = await productsController.getAll(invalidToken, {});
  //   expect(getProductsResponse.status, '').toBe(STATUS_CODES.NOT_AUTHORIZED);
  // });
});
