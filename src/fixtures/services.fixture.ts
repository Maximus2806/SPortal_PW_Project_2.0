import { AddNewCustomerPageService } from '../ui/services/customers/addNewCustomer.service';
import { CustomersListPageService } from '../ui/services/customers/customers.service';
import { HomePageService } from '../ui/services/home.service';
import { SignInPageService } from '../ui/services/signIn.service';
import { test as base } from './pages.fixture';

interface ISalesPortalPageServices {
  signInPageService: SignInPageService;
  homePageService: HomePageService;
  customersPageService: CustomersListPageService;
  addNewCustomerPageService: AddNewCustomerPageService;
}

export const test = base.extend<ISalesPortalPageServices>({
  signInPageService: async ({ page }, use) => await use(new SignInPageService(page)),
  homePageService: async ({ page }, use) => await use(new HomePageService(page)),
  customersPageService: async ({ page }, use) => await use(new CustomersListPageService(page)),
  addNewCustomerPageService: async ({ page }, use) => await use(new AddNewCustomerPageService(page))
});

export { expect } from './pages.fixture';
