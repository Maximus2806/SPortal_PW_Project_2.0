import { test as ui } from '../../../fixtures/services.fixture';
import { test as api } from '../../../fixtures/apiServices.fixture';
import { mergeTests } from 'playwright/test';
import { TAGS } from '../../../data/tags';
import { ICustomer, ICustomerFromResponse } from '../../../data/types/customers/customers.types';
import { NOTIFICATIONS } from '../../../data/notifications';
import { generateNewCustomer } from '../../../data/customers/generateCustomer';

const test = mergeTests(ui, api);

let customer: ICustomer | ICustomerFromResponse, token: string;

test.beforeAll(async ({ signInApiService }) => {
  token = await signInApiService.signInAsAdmin();
});

test.beforeEach('Open customers page', async function ({ homePageService, signInPageService }) {
  await signInPageService.openSalesPortal();
  await homePageService.openCustomersPage();
});

test(
  'Should create a customer and verify its data in details modal',
  { tag: [TAGS.SMOKE] },
  async ({ customersPageService, addNewCustomerPageService }) => {
    await customersPageService.openAddNewCustomerPage();
    customer = await addNewCustomerPageService.create();
    await customersPageService.verifyNotification(NOTIFICATIONS.CUSTOMER_CREATED);
    await customersPageService.validateCustomerDataInModal(customer);
  }
);

test(
  'Should create a customer and verify data in table',
  {
    tag: [TAGS.SMOKE]
  },
  async ({ customersPageService, addNewCustomerPageService }) => {
    await customersPageService.openAddNewCustomerPage();
    customer = await addNewCustomerPageService.create();
    await customersPageService.verifyNotification(NOTIFICATIONS.CUSTOMER_CREATED);
    await customersPageService.validateCustomerDataInTable(customer);
  }
);

test(
  'Should get error when creating customer with an existing email',
  {
    tag: [TAGS.REGRESSION]
  },
  async ({ customersPageService, addNewCustomerPage, customersApiService }) => {
    customer = await customersApiService.create();
    await customersPageService.openAddNewCustomerPage();
    await addNewCustomerPage.fillInputs(generateNewCustomer({ email: customer.email }));
    await addNewCustomerPage.clickOnSaveButton();
    await customersPageService.verifyNotification(`Customer with email '${customer.email}' already exists`);
  }
);

test.afterEach('Delete created customer', async function ({ customersApiService }) {
  await customersApiService.deleteCustomerWithEmail(customer.email);
});
