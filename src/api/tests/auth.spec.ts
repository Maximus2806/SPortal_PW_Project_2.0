import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../config/environment';
import { STATUS_CODES } from '../../data/api/statusCodes';
import { generateNewCustomer } from '../../data/customers/generateCustomer';
import { generateProductData } from '../../data/products/generateProduct';
import { routesProducts, testRoutesAuth, routesCustomers } from '../../data/shared.data';
import { ICustomerFromResponse } from '../../data/types/customers/customers.types';
import { IProductFromResponse } from '../../data/types/products/product.types';
import { test } from '../../fixtures/apiContollers.fixture';
import { validateResponse } from '../../utils/validation/apiValidation';

test.describe('[API] [Products / Customers] Auth validation', async () => {
  let token: string, product: IProductFromResponse, customer: ICustomerFromResponse;
  test.beforeAll('Get valid auth token', async ({ signInController, productsController, customersController }) => {
    token = (await signInController.login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD })).headers[
      'authorization'
    ];
    product = (await productsController.create(generateProductData(), token)).body.Product;
    // customer = (await customersController.create(generateNewCustomer(), token)).body.Customer;
  });

  for (const { route, body, requiresId } of routesProducts) {
    for (const { name, token: testToken, errorMessage } of testRoutesAuth) {
      test(`Products controller - Should get error in route "${route}" with ${name}`, async ({
        productsController
      }) => {
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
      test.skip(`Customer controllers - Should get error in route "${route}" with ${name}`, async ({
        customersController
      }) => {
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
