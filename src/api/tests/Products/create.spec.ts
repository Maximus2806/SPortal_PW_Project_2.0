import _ from 'lodash';
import { createBodyData } from '../../../data/api/Products/createBodyData';
import { STATUS_CODES } from '../../../data/api/statusCodes';
import { generateProductData } from '../../../data/products/generateProduct';
import { IProduct } from '../../../data/types/product.types';
import { test, expect } from '../../../fixtures/apiServices.fixture';
import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation';
import { createProductSchema } from '../../../data/jsonSchemas/createProduct.schema';

test.describe('[API] [Products] [Create New Product]', async function () {
  let token = '';

  test.beforeAll(async function ({ signInApiService }) {
    token = await signInApiService.signInAsAdmin();
  });

  test('Should create new product with random valid data and all fields', async function ({ productApiService }) {
    const productData = generateProductData();
    const createProductResponse = await productApiService.create(productData);
    expect(createProductResponse).toMatchObject({
      ...productData
    });
    await productApiService.delete(createProductResponse._id);
  });

  test('Should create new product with random valid data and only required fields', async function ({
    productApiService
  }) {
    const productData = _.omit(generateProductData(), ['notes']);
    const createProductResponse = await productApiService.create(productData);
    expect(createProductResponse).toMatchObject({
      ...productData
    });
    await productApiService.delete(createProductResponse._id);
  });

  test('Should create new product with random valid data and one excessive field', async function ({
    productApiService
  }) {
    const productData = generateProductData();
    const productDataExcessive = { ...productData, excessiveField: 'some text' };
    const createProductResponse = await productApiService.create(productDataExcessive as IProduct);
    expect(createProductResponse).toMatchObject({
      ...productData
    });
    await productApiService.delete(createProductResponse._id);
  });

  test('Should not create new product with not unique name', async function ({
    productApiService,
    productsController
  }) {
    const product = await productApiService.create();
    const invalidProduct = generateProductData({ name: product.name });
    const response = await productsController.create(invalidProduct, token);
    expect(response.status).toBe(STATUS_CODES.CONFLICT);
    expect(response.body.ErrorMessage).toBe(`Product with name '${product.name}' already exists`);
    await productApiService.delete(product._id);
  });

  test('Should return 400 error for empty body', async function ({ productsController }) {
    const response = await productsController.create({} as IProduct, token);
    validateResponse(response, STATUS_CODES.BAD_REQUEST, false, 'Incorrect request body');
  });

  test('Should return 401 error for invalid auth token', async function ({ productsController }) {
    const productData = generateProductData();
    const response = await productsController.create(productData, '');
    validateResponse(response, STATUS_CODES.NOT_AUTHORIZED, false, 'Not authorized');
  });

  test('Shoud verify createdOn field format in response', async function ({ productApiService }) {
    const productData = generateProductData();
    const createProductResponse = await productApiService.create(productData);
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    expect(createProductResponse.createdOn).toMatch(iso8601Regex);
  });

  const requiredFields = ['name', 'manufacturer', 'price', 'amount'];
  requiredFields.forEach((field) =>
    test(`Should not create product without ${field} field`, async function ({ productsController }) {
      const productData = _.omit(generateProductData(), field);
      console.log(productData);
      const response = await productsController.create(productData as IProduct, token);
      validateResponse(response, STATUS_CODES.BAD_REQUEST, false, 'Incorrect request body');
    })
  );

  createBodyData.forEach(({ description, params, expectedStatus, isSuccess, errorMessage }) => {
    test(`${description}`, async function ({ signInApiService, productsController, productApiService }) {
      const createProductsResponse = await productsController.create(
        generateProductData(params as Partial<IProduct>),
        signInApiService.getToken()
      );
      validateResponse(createProductsResponse, expectedStatus, isSuccess, errorMessage);
      if (isSuccess) {
        validateJsonSchema(createProductSchema, createProductsResponse);
        await productApiService.delete(createProductsResponse.body.Product._id);
      }
    });
  });
});
