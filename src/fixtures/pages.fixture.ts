import { test as base } from './mock.fixture';
import { AddNewCustomerPage } from '../ui/pages/customers/addNewCustomer.page';
import { CustomersListPage } from '../ui/pages/customers/customers.page';
import { HomePage } from '../ui/pages/home.page';
import { SignInPage } from '../ui/pages/signIn.page';
import { FilterModal } from '../ui/pages/customers/filterModal.page';

interface ISalesPortalPages {
  signInPage: SignInPage;
  homePage: HomePage;
  customersPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;
  filterModalPage: FilterModal;
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
  filterModalPage: async ({ page }, use) => {
    const filterModalPage = new FilterModal(page);
    await use(filterModalPage);
  }
});

export { expect } from '@playwright/test';
