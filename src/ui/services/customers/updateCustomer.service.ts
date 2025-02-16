import { generateNewCustomer } from '../../../data/customers/generateCustomer';
import { ICustomer } from '../../../data/types/customers/customers.types';
import { CustomersListPage } from '../../pages/customers/customers.page';
import { EditCustomerPage } from '../../pages/customers/editCustomer.page';
import { SalesPortalPageService } from '../salesPortal.service';
import { Page } from '@playwright/test';

export class UpdateCustomerPageService extends SalesPortalPageService {
  private editCustomerPage: EditCustomerPage;
  private customersPage: CustomersListPage;
  constructor(protected page: Page) {
    super(page);
    this.editCustomerPage = new EditCustomerPage(page);
    this.customersPage = new CustomersListPage(page);
  }

  async update(customerData?: Partial<ICustomer>) {
    const data = generateNewCustomer(customerData);
    await this.editCustomerPage.fillInputs(data);
    await this.editCustomerPage.clickOnSaveChangesButton();
    await this.editCustomerPage.waitForSpinnerToHide();
    await this.customersPage.waitForOpened();
    return data;
  }
}
