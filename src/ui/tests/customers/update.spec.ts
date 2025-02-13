import { test as ui } from '../../../fixtures/services.fixture';
import { test as api } from '../../../fixtures/apiServices.fixture';
import { mergeTests } from 'playwright/test';
import { TAGS } from '../../../data/tags';
import { ICustomerFromResponse } from '../../../data/types/customers/customers.types';
import { NOTIFICATIONS } from '../../../data/notifications';

const test = mergeTests(ui, api);
let customer: ICustomerFromResponse, token: string;

test.beforeEach('Open customers page', async function ({ homePageService, signInPageService, customersApiService }) {
  customer = await customersApiService.create();
  await signInPageService.openSalesPortal();
  await homePageService.openCustomersPage();
});

test(
  'Should update customer with valid data',
  { tag: [TAGS.SMOKE] },
  async ({ customersPageService, updateCustomerPageService, customersApiService }) => {
    await customersPageService.openEditPageForCustomerWithEmail(customer.email);
    const updatedCustomer = await updateCustomerPageService.update();
    await customersPageService.verifyNotification(NOTIFICATIONS.CUSTOMER_UPDATED);
    await customersPageService.validateCustomerDataInTable(updatedCustomer);
    await customersPageService.validateCustomerDataInModal(updatedCustomer);
  }
);

test(
  'Should get error  when updating with existinng email',
  { tag: [TAGS.SMOKE] },
  async ({ customersPageService, updateCustomerPageService, customersApiService, editCustomerPage }) => {
    await customersPageService.openEditPageForCustomerWithEmail(customer.email);
    const newCustomer = await customersApiService.create();
    const existingEmail = newCustomer.email;
    await editCustomerPage.fillInputs({ ...customer, email: existingEmail });
    await editCustomerPage.clickOnSaveChangesButton();
    await customersPageService.verifyNotification(`Customer with email '${existingEmail}' already exists`);
    await customersApiService.delete(newCustomer._id);
  }
);

test.afterEach(async ({ customersApiService }) => {
  await customersApiService.delete(customer._id);
});
