import { AddNewCustomerPage } from './addNewCustomer.page';

export class EditCustomerPage extends AddNewCustomerPage {
  uniqueElement = '#delete-customer-btn';
  readonly 'Delete customer button' = this.findElement('#delete-customer-btn');
  readonly 'Save changes button' = this.findElement('#save-customer-changes');

  async clickOnDeleteCustomerButton() {
    await this.click(this['Delete customer button']);
  }

  async clickOnSaveChangesButton() {
    await this.click(this['Save changes button']);
  }
}
