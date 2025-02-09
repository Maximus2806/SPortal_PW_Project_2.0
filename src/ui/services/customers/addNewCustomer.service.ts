import { Page } from '@playwright/test';
import { generateNewCustomer } from '../../../data/customers/generateCustomer.js';
import { ICustomer } from '../../../data/types/customers/customers.types.js';
import { AddNewCustomerPage } from '../../pages/customers/addNewCustomer.page.js';
import { CustomersListPage } from '../../pages/customers/customers.page.js';

export class AddNewCustomerPageService {
  private customersPage: CustomersListPage;
  private addNewCustomerPage: AddNewCustomerPage;

  constructor(protected page: Page) {
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    this.customersPage = new CustomersListPage(page);
  }

  async fillCustomerInputs(customer: Partial<ICustomer>) {
    await this.addNewCustomerPage.fillInputs(customer);
  }

  async save() {
    await this.addNewCustomerPage.clickOnSaveButton();
  }

  async create(customer?: ICustomer) {
    const customerData = customer ?? generateNewCustomer();
    await this.fillCustomerInputs(customerData);
    await this.save();
    await this.addNewCustomerPage.waitForSpinnerToHide();
    await this.customersPage.waitForOpened();
    return customerData;
  }
}
