import _ from 'lodash';
import { AddNewCustomerPage } from '../../pages/customers/addNewCustomer.page.js';
import { CustomersListPage } from '../../pages/customers/customers.page.js';
import { expect, Page } from '@playwright/test';
import { NOTIFICATIONS } from '../../../data/notifications.js';
import { SalesPortalPageService } from '../salesPortal.service.js';
import { COUNTRIES } from '../../../data/customers/countries.js';
import { FilterModalPage } from '../../pages/modals/filter-modal.page.js';
import { CustomerDetailsPage } from '../../pages/customers/customerDetails.page';
import { ICustomer, ICustomerFromResponse } from '../../../data/types/customers/customers.types.js';
import { logStep } from '../../../utils/reporter/logStep.js';

export class CustomersListPageService extends SalesPortalPageService {
  private customersPage: CustomersListPage;
  private addNewCustomerPage: AddNewCustomerPage;
  private filterModalPage: FilterModalPage;
  private customerDetailsPage: CustomerDetailsPage;
  constructor(protected page: Page) {
    super(page);
    this.customersPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    this.filterModalPage = new FilterModalPage(page);
    this.customerDetailsPage = new CustomerDetailsPage(page);
  }

  @logStep('Open customers page')
  async openAddNewCustomerPage() {
    await this.customersPage.clickOnAddNewCustomer();
    await this.customersPage.waitForSpinnerToHide();
    await this.addNewCustomerPage.waitForOpened();
  }

  @logStep('Open customer detailse page')
  async openCustomerDetails(customerEmail: string) {
    await this.customersPage.clickOnCustomerDetails(customerEmail);
    await this.customerDetailsPage.waitForOpened();
  }

  @logStep('Validate notification')
  async validateCreateCustomerNotification() {
    const notificationText = await this.customersPage.getLastNotificationText();
    expect(notificationText).toBe(NOTIFICATIONS.CUSTOMER_CREATED);
  }

  @logStep('Verify empty table text')
  async validateEmpryTableText() {
    const actualText = await this.customersPage.getEmptyTableMessage();
    expect(actualText).toBe('No records created yet');
  }

  @logStep('Set and applycountry filter')
  async applyCountryFilter(countries: COUNTRIES[]) {
    await this.customersPage.clickOnFilterButton();
    await this.filterModalPage.checkFilterBox(countries);
    await this.filterModalPage.clickOnActionButton();
    await this.customersPage.waitForOpened();
  }

  @logStep('Verify filter output results')
  async validateFilterResults(value: string) {
    const customers = await this.customersPage.getAllCustomersFromTable();
    if (customers.length === 0) {
      console.log('No customers found');
      await this.validateEmpryTableText();
    } else {
      customers.every((customer) => expect(customer.country).toContain(value));
    }
  }

  @logStep('Retreive customer data from details page')
  async getCustomerDataFromModal(customerEmail: string) {
    await this.openCustomerDetails(customerEmail);
    const actualData = await this.customerDetailsPage.getCustomerData();
    return actualData;
  }

  @logStep('Verify customer data in table')
  async validateCustomerDataInTable(customer: ICustomer | ICustomerFromResponse) {
    const testCustomer = _.pick(customer, ['email', 'name', 'country']);
    const actualData = await this.customersPage.getCustomerFromTable(customer.email);
    expect(
      _.omit(actualData, ['createdOn']),
      `Shoul verify product data in table to be expected ${JSON.stringify(testCustomer, null, 2)}`
    ).toEqual(testCustomer);
  }

  @logStep('Verify customer data on details page')
  async validateCustomerDataInModal(customer: ICustomer) {
    const actualData = _.omit(await this.getCustomerDataFromModal(customer.email), ['createdOn']);
    const convertedActualData = { ...actualData, house: +actualData.house, flat: +actualData.flat };
    expect(
      convertedActualData,
      `Shoul verify product data in modal window to be expected ${JSON.stringify(customer, null, 2)}`
    ).toEqual(customer);
  }
}
