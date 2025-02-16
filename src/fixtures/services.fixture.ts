import { AddNewCustomerPageService } from '../ui/services/customers/addNewCustomer.service';
import { CustomersListPageService } from '../ui/services/customers/customers.service';
import { UpdateCustomerPageService } from '../ui/services/customers/updateCustomer.service';
import { HomePageService } from '../ui/services/home.service';
import { AddNewProductPageService } from '../ui/services/products/addNewProductPage.service';
import { EditProductPageService } from '../ui/services/products/editProductPage.service';
import { ProductsListPageService } from '../ui/services/products/productsPage.service';
import { SignInPageService } from '../ui/services/signIn.service';
import { test as base } from './pages.fixture';

interface ISalesPortalPageServices {
  signInPageService: SignInPageService;
  homePageService: HomePageService;
  customersPageService: CustomersListPageService;
  addNewCustomerPageService: AddNewCustomerPageService;
  productsPageService: ProductsListPageService;
  addNewProductPageService: AddNewProductPageService;
  editProductPageService: EditProductPageService;
  updateCustomerPageService: UpdateCustomerPageService;
}

export const test = base.extend<ISalesPortalPageServices>({
  signInPageService: async ({ page }, use) => await use(new SignInPageService(page)),
  homePageService: async ({ page }, use) => await use(new HomePageService(page)),
  customersPageService: async ({ page }, use) => await use(new CustomersListPageService(page)),
  addNewCustomerPageService: async ({ page }, use) => await use(new AddNewCustomerPageService(page)),
  productsPageService: async ({ page }, use) => await use(new ProductsListPageService(page)),
  addNewProductPageService: async ({ page }, use) => await use(new AddNewProductPageService(page)),
  editProductPageService: async ({ page }, use) => await use(new EditProductPageService(page)),
  updateCustomerPageService: async ({ page }, use) => await use(new UpdateCustomerPageService(page))
});

export { expect } from './pages.fixture';
