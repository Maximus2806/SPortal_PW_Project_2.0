import _ from 'lodash';
import { AddNewCustomerPage } from '../../pages/customers/addNewCustomer.page.js';
import { CustomersListPage } from '../../pages/customers/customers.page.js';
import { expect, Page } from '@playwright/test';
import { NOTIFICATIONS } from '../../../data/notifications.js';
import { SalesPortalPageService } from '../salesPortal.service.js';
import { COUNTRIES } from '../../../data/customers/countries.js';
import { FilterModal } from '../../pages/customers/filterModal.page.js';

export class CustomersListPageService extends SalesPortalPageService {
  private customersPage: CustomersListPage;
  private addNewCustomerPage: AddNewCustomerPage;
  private filterModalPage: FilterModal;
  constructor(protected page: Page) {
    super(page);
    this.customersPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    this.filterModalPage = new FilterModal(page);
  }

  async openAddNewCustomerPage() {
    await this.customersPage.clickOnAddNewCustomer();
    await this.customersPage.waitForSpinnerToHide();
    await this.addNewCustomerPage.waitForOpened();
  }

  async validateCreateCustomerNotification() {
    const notificationText = await this.customersPage.getLastNotificationText();
    expect(notificationText).toBe(NOTIFICATIONS.CUSTOMER_CREATED);
  }

  async validateEmpryTableText() {
    const actualText = await this.customersPage.getEmptyTableMessage();
    expect(actualText).toBe('No records created yet');
  }

  async applyCountryFilter(country: COUNTRIES) {
    await this.customersPage.clickOnFilterButton();
    console.log('Step1');
    await this.filterModalPage.setFilter(country);
    console.log('Step2');
    await this.filterModalPage.applyFilter();
    console.log('Step3');
    await this.customersPage.waitForOpened();
  }

  async validateFilterResults(value: string) {
    const customers = await this.customersPage.getAllCustomersFromTable();
    customers.every((customer) => expect(customer.country).toContain(value));
  }
}
