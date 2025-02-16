import { CustomersController } from '../api/controllers/customers.controller';
import { OrdersController } from '../api/controllers/orders.controller';
import { ProductsController } from '../api/controllers/products.controller';
import { SignInController } from '../api/controllers/signIn.controller';
import { test as base } from '@playwright/test';

interface ISalesPortalApiControllers {
  signInController: SignInController;
  customersController: CustomersController;
  productsController: ProductsController;
  ordersController: OrdersController;
}

export const test = base.extend<ISalesPortalApiControllers>({
  signInController: async ({}, use) => {
    await use(new SignInController());
  },

  customersController: async ({}, use) => {
    await use(new CustomersController());
  },

  productsController: async ({}, use) => {
    await use(new ProductsController());
  },

  ordersController: async ({}, use) => {
    await use(new OrdersController());
  }
});

export { expect } from '@playwright/test';
