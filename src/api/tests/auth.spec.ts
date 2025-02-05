import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../config/environment';
import { STATUS_CODES } from '../../data/api/statusCodes';
import { generateNewCustomer } from '../../data/customers/generateCustomer';
import { generateProductData } from '../../data/products/generateProduct';
import { ICustomerFromResponse } from '../../data/types/customers.types';
import { IProductFromResponse } from '../../data/types/products/product.types';
import  { test } from '../../fixtures/apiContollers.fixture';
import { validateResponse } from '../../utils/validation/apiValidation';

const routesProducts = [
  { route: 'get', requiresId: true },
  { route: 'getAll', requiresId: false, body: {} },
  { route: 'create', requiresId: false, body: generateProductData() },
  { route: 'delete', requiresId: true },
  { route: 'update', requiresId: true, body: generateProductData() },
];

const routesCustomers = [
  { route: 'get', requiresId: true },
  { route: 'getAll', requiresId: false, body: {} },
  { route: 'create', requiresId: false, body: generateNewCustomer() },
  { route: 'delete', requiresId: true },
  { route: 'update', requiresId: true, body: generateNewCustomer() },
];

const testRoutesAuth = [
  { name: 'empty token', token: '', errorMessage: 'Not authorized' },
  { name: 'expired token', errorMessage: 'Access token expired',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTA0OTkzYWFlNDQwMTg0YWY2NDc3YiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTczODQyOTM1MiwiZXhwIjoxNzM4NTE1NzUyfQ.SZYTOwqpb51CtlznhFe66_YX9H6KARX9VBkQWW3eIv4' },
];

test.describe('[API] [Products / Customers] Auth validation', async () => {
  let token: string, product: IProductFromResponse, customer: ICustomerFromResponse;
  test.beforeAll('Get valid auth token', async ({ signInController, productsController, customersController }) => {
    token = (await signInController
      .login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD })).headers['authorization'];
    product = (await productsController.create(generateProductData(), token)).body.Product;
    // customer = (await customersController.create(generateNewCustomer(), token)).body.Customer;

  });

  for (const { route, body, requiresId } of routesProducts) {
    for (const { name, token: testToken, errorMessage } of testRoutesAuth) {
      test(`Products controller - Should get error in route "${route}" with ${name}`, async ({ productsController }) => {
        const requestData = requiresId
          ? body !== undefined
            ? [product._id, body, testToken]
            : [product._id, testToken]
          : body !== undefined
            ? [body, testToken]
            : [testToken];

        const response = await productsController[route](...requestData);
        validateResponse(response, STATUS_CODES.NOT_AUTHORIZED, false, errorMessage);
      });
    }
  }

  // TODO
  for (const { route, body, requiresId } of routesCustomers) {
    for (const { name, token: testToken, errorMessage } of testRoutesAuth) {
      test(`Customer controllers - Should get error in route "${route}" with ${name}`, async ({ customersController }) => {
        const requestData = requiresId
          ? body !== undefined
            ? [product._id, body, testToken]
            : [product._id, testToken]
          : body !== undefined
            ? [body, testToken]
            : [testToken];

        const response = await customersController[route](...requestData);
        validateResponse(response, STATUS_CODES.NOT_AUTHORIZED, false, errorMessage);
      });
    }
  }

});