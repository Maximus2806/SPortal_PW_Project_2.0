import _ from 'lodash';
import { createBodyData } from '../../../data/api/Products/createBodyData';
import { STATUS_CODES } from '../../../data/api/statusCodes';
import { generateProductData } from '../../../data/products/generateProduct';
import { productResponseSchema } from '../../../data/jsonSchemas/product.schema';
import { IProduct } from '../../../data/types/product.types';
import { test, expect } from '../../../fixtures/apiServices.fixture';
import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation';

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

  test('Should create new product with random valid data and only required fields', async function ({ productApiService }) {
    const productData = _.omit(generateProductData(), ['notes']);
    const createProductResponse = await productApiService.create(productData);
    expect(createProductResponse).toMatchObject({
      ...productData
    });
    await productApiService.delete(createProductResponse._id);
  });

  // test('Should create new customer with random valid data and one excessive field', async function ({
  //   customersApiService
  // }) {
  //   const customerData = generateNewCustomer();
  //   const customerDataExcessive = { ...customerData, excessiveField: 'some text' };
  //   const createCustomerResponse = await customersApiService.create(customerDataExcessive as ICustomer);
  //   expect(createCustomerResponse).toMatchObject({
  //     ...customerData
  //   });
  //   await customersApiService.delete(createCustomerResponse._id);
  // });

  // test('Should not create new customer with not unique email', async function ({
  //   customersApiService,
  //   customersController
  // }) {
  //   const customer = await customersApiService.create();
  //   const imvalidCustomer = generateNewCustomer({ email: customer.email });
  //   const response = await customersController.create(token, imvalidCustomer);
  //   expect(response.status).toBe(STATUS_CODES.CONFLICT);
  //   expect(response.body.ErrorMessage).toBe(`Customer with email '${customer.email}' already exists`);
  //   await customersApiService.delete(customer._id);
  // });

  // test('Should return 400 error for empty body', async function ({ customersController }) {
  //   const response = await customersController.create(token, {} as ICustomer);
  //   validateResponse(response, STATUS_CODES.BAD_REQUEST, false, 'Incorrect request body');
  // });

  // test('Should return 401 error for invalid auth token', async function ({ customersController }) {
  //   const customerData = generateNewCustomer();
  //   const response = await customersController.create('', customerData);
  //   validateResponse(response, STATUS_CODES.NOT_AUTHORIZED, false, 'Not authorized');
  // });

  // test('Shoud verify createdOn field format in response', async function ({ customersApiService }) {
  //   const customerData = generateNewCustomer();
  //   const createCustomerResponse = await customersApiService.create(customerData);
  //   const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  //   expect(createCustomerResponse.createdOn).toMatch(iso8601Regex);
  // });

  // const requiredFields = ['email', 'name', 'country', 'city', 'street', 'house', 'flat', 'phone'];
  // requiredFields.forEach((field) =>
  //   test(`Should not create customer without ${field} field`, async function ({ customersController }) {
  //     const customerData = _.omit(generateNewCustomer(), field);
  //     console.log(customerData);
  //     const response = await customersController.create(token, customerData as ICustomer);
  //     validateResponse(response, STATUS_CODES.BAD_REQUEST, false, 'Incorrect request body');
  //   })
  // );

  // createBodyData.forEach(({ description, params, expectedStatus, isSuccess, errorMessage }) => {
  //   test(`${description}`, async function ({ signInApiService, customersController, customersApiService }) {
  //     const createProductsResponse = await customersController.create(
  //       signInApiService.getToken(),
  //       generateNewCustomer(params as Partial<ICustomer>)
  //     );
  //     validateResponse(createProductsResponse, expectedStatus, isSuccess, errorMessage);
  //     if (isSuccess) {
  //       validateJsonSchema(createCustomerSchema, createProductsResponse);
  //       await customersApiService.delete(createProductsResponse.body.Customer._id);
  //     }
  //   });
  // });
});
