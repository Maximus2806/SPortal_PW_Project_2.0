import { test as base } from './mock.fixture';
import { AddNewCustomerPage } from '../ui/pages/customers/addNewCustomer.page';
import { CustomersListPage } from '../ui/pages/customers/customers.page';
import { HomePage } from '../ui/pages/home.page';
import { SignInPage } from '../ui/pages/signIn.page';
import { FilterModal } from '../ui/pages/customers/filterModal.page';
import { ProductsListPage } from '../ui/pages/products/products.page';
import { AddNewProductPage } from '../ui/pages/products/addNewProduct.page';
import { EditProductPage } from '../ui/pages/products/editProduct.page';
import { CustomerDetailsPage } from '../ui/pages/customers/customerDetails.page';

interface ISalesPortalPages {
  signInPage: SignInPage;
  homePage: HomePage;
  customersPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;
  customerDetailsPage: CustomerDetailsPage;
  filterModalPage: FilterModal;
  productsPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  editProductPage: EditProductPage;
}

export const test = base.extend<ISalesPortalPages>({
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);
    await use(signInPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  customersPage: async ({ page }, use) => {
    const customersPage = new CustomersListPage(page);
    await use(customersPage);
  },
  addNewCustomerPage: async ({ page }, use) => {
    const addNewCustomerPage = new AddNewCustomerPage(page);
    await use(addNewCustomerPage);
  },
  customerDetailsPage: async ({ page }, use) => {
    const customerDetailsPage = new CustomerDetailsPage(page);
    await use(customerDetailsPage);
  },
  filterModalPage: async ({ page }, use) => {
    const filterModalPage = new FilterModal(page);
    await use(filterModalPage);
  },
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsListPage(page);
    await use(productsPage);
  },
  addNewProductPage: async ({ page }, use) => {
    const addNewProductPage = new AddNewProductPage(page);
    await use(addNewProductPage);
  },
  editProductPage: async ({ page }, use) => {
    const editProductPage = new EditProductPage(page);
    await use(editProductPage);
  }
});

export { expect } from '@playwright/test';
