import { BaseModal } from '../modals/baseModal.page';
import { SalesPortalPage } from '../salesPortal.page';

export class CustomerDetailsPage extends SalesPortalPage {
  uniqueElement = '#customer-info-container h3';
  private ['Back to customers button'] = '.back-link';
  private ['Edit customer pencil'] = '#edit-customer-pencil';
  private readonly 'Row value by row name' = (row: string) => `//div[@class="card-body"]//*[@id='customer-${row}']`;

  async clickBackToCustomers() {
    await this.click(this['Back to customers button']);
  }

  async clickOnEditCustomer() {
    await this.click(this['Edit customer pencil']);
  }

  async getCustomerData() {
    const [email, name, country, city, street, house, flat, phone, createdOn, notes] = await Promise.all([
      this.getText(this['Row value by row name']('email')),
      this.getText(this['Row value by row name']('name')),
      this.getText(this['Row value by row name']('country')),
      this.getText(this['Row value by row name']('city')),
      this.getText(this['Row value by row name']('street')),
      this.getText(this['Row value by row name']('house')),
      this.getText(this['Row value by row name']('flat')),
      this.getText(this['Row value by row name']('phone')),
      this.getText(this['Row value by row name']('created-on')),
      this.getText(this['Row value by row name']('notes'))
    ]);
    return { email, name, country, city, street, house, flat, phone, createdOn, notes };
  }

  //TODO: async OpenOrderDetailsByOrderNumber(orderNumber: string){}
}
