import { test as base } from './apiContollers.fixture';
import { SignInApiService } from '../api/service/signInApiService.service';
import { CustomersController } from '../api/controllers/customers.controller';
import { CustomersApiService } from '../api/service/customersApi.service';
import { ProductApiService } from '../api/service/productApiService.service';
import { ProductsController } from '../api/controllers/products.controller';
import { OrdersApiService } from '../api/service/ordersApi.service';
import { OrdersController } from '../api/controllers/orders.controller';

interface ISalesPortalApiServices {
  signInApiService: SignInApiService;
  customersApiService: CustomersApiService;
  productApiService: ProductApiService;
  ordersApiService: OrdersApiService;
}

const signInApiService = new SignInApiService();

export const test = base.extend<ISalesPortalApiServices>({
  signInApiService: async ({}, use) => {
    await use(signInApiService);
  },

  customersApiService: async ({}, use) => {
    await use(new CustomersApiService(new CustomersController()));
  },

  productApiService: async ({}, use) => {
    await use(new ProductApiService(new ProductsController()));
  },
  ordersApiService: async ({}, use) => {
    await use(new OrdersApiService(new OrdersController()));
  }
});

export { expect } from '@playwright/test';
