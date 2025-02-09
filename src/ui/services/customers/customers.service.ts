import _ from 'lodash';
import { AddNewCustomerPage } from '../../pages/customers/addNewCustomer.page.js';
import { CustomersListPage } from '../../pages/customers/customers.page.js';
import { expect, Page } from '@playwright/test';
import { NOTIFICATIONS } from '../../../data/notifications.js';
import { SalesPortalPageService } from '../salesPortal.service.js';
import { COUNTRIES } from '../../../data/customers/countries.js';
import { FilterModalPage } from '../../pages/modals/filter-modal.page.js';
// import { FilterModal } from '../../pages/customers/filterModal.page.js';

export class CustomersListPageService extends SalesPortalPageService {
  private customersPage: CustomersListPage;
  private addNewCustomerPage: AddNewCustomerPage;
  private filterModalPage: FilterModalPage;
  constructor(protected page: Page) {
    super(page);
    this.customersPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    this.filterModalPage = new FilterModalPage(page);
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

  async applyCountryFilter(countries: COUNTRIES[]) {
    await this.customersPage.clickOnFilterButton();    
    await this.filterModalPage.checkFilterBox(countries);    
    await this.filterModalPage.clickOnActionButton();    
    await this.customersPage.waitForOpened();    
  }

  async validateFilterResults(value: string) {
    const customers = await this.customersPage.getAllCustomersFromTable();
    if (customers.length === 0) {
      console.log('No customers found');
      await this.validateEmpryTableText();
    } else {
      customers.every((customer) => expect(customer.country).toContain(value));
    }
    
  }
}
