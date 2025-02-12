import { test as ui } from '../../../fixtures/services.fixture';
import { test as api } from '../../../fixtures/apiServices.fixture';
import { expect, mergeTests } from 'playwright/test';
import { TAGS } from '../../../data/tags';
import { ICustomer, ICustomerFromResponse } from '../../../data/types/customers/customers.types';
import { NOTIFICATIONS } from '../../../data/notifications';
import { STATUS_CODES } from '../../../data/api/statusCodes';

const test = mergeTests(ui, api);
let customer: ICustomerFromResponse, token: string;

test.beforeEach('Open customers page', async function ({ homePageService, signInPageService, customersApiService }) {
  customer = await customersApiService.create();
  await signInPageService.openSalesPortal();
  await homePageService.openCustomersPage();
});

test(
  'Should delete customer on "Customers list" page',
  { tag: [TAGS.SMOKE] },
  async ({ customersPageService, customersApiService }) => {
    await customersPageService.deleteCustomer(customer.email);
    await customersPageService.verifyNotification(NOTIFICATIONS.CUSTOMER_DELETED);
    const foundCustomers = await customersApiService.getCustomersWithSearch(customer.email);
    expect(foundCustomers.length).toBe(0);
  }
);

test(
  'Should delete customer from "Edit customer" page',
  { tag: [TAGS.SMOKE] },
  async ({ customersPageService, customersApiService }) => {
    await customersPageService.openEditPageForCustomerWithEmail(customer.email);
    await customersPageService.deleteFromEditPage();
    await customersPageService.verifyNotification(NOTIFICATIONS.CUSTOMER_DELETED);
    const foundCustomers = await customersApiService.getCustomersWithSearch(customer.email);
    expect(foundCustomers.length).toBe(0);
  }
);

test.afterEach(async ({ customersApiService, customersController, signInApiService }) => {
  const token = await signInApiService.signInAsAdmin();
  const getCustomerResponse = await customersController.get(token, customer._id);  
  if (getCustomerResponse.status !== STATUS_CODES.NOT_FOUND) await customersApiService.delete(customer._id);
});
