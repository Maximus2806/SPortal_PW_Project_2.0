import { test as ui } from '../../../fixtures/services.fixture';
import { test as api } from '../../../fixtures/apiServices.fixture';
import { mergeTests } from 'playwright/test';
import { TAGS } from '../../../data/tags';
import { ICustomerFromResponse } from '../../../data/types/customers/customers.types';
import { ESortOrder } from '../../../data/types/api.types';
import { TCustomerTableFields } from '../../../data/types/customers/customerSort.types';

const test = mergeTests(ui, api);

let token: string, customers: ICustomerFromResponse[];
test.beforeAll(async ({ signInApiService, customersApiService }) => {
  token = await signInApiService.signInAsAdmin();
  customers = await customersApiService.populateCustomers(5, token);
});

for (const key of ['Email', 'Name', 'Country', 'Created On']) {
  for (const order of Object.values(ESortOrder)) {
    test(
      `Sould display customers sorted by ${key} in ${order}`,
      { tag: [TAGS.REGRESSION] },
      async function ({ customersPageService, signInPageService, homePageService }) {
        await signInPageService.openSalesPortal();
        await homePageService.openCustomersPage();
        await customersPageService.verifySortingResults(key as TCustomerTableFields, order);
      }
    );
  }
}

test.afterAll('Clear data after test', async ({ customersApiService }) => {
  for (const customer of customers) {
    console.log('Deleting customer', customer._id);
    await customersApiService.delete(customer._id);
  }
});
