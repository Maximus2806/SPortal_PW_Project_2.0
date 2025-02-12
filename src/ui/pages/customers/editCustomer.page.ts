import { AddNewCustomerPage } from './addNewCustomer.page';

export class EditCustomerPage extends AddNewCustomerPage {
  uniqueElement = '#delete-customer-btn';
  readonly 'Delete customer button' = this.findElement('#delete-customer-btn');

  async clickOnDeleteCustomerButton() {
    await this.click(this['Delete customer button']);
  }
}
