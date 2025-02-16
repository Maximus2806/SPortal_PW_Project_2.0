import { ICustomerDetails, IOrderDetails, IRequestedProductDetails } from '../../../data/types/orders/orders.types';
import { SalesPortalPage } from '../salesPortal.page.js';

export class EditOrderPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[.="Order Details"]';
  private readonly 'Key details' = (key: string) =>
    `//*[contains(@class,'fw-bold') and text()='${key}']/following-sibling::*[text()]`;
  private readonly 'Refresh order button' = `#refresh-order`;
  private readonly 'Accordion section' = `#products-accordion-section`;
  private readonly 'Accordion button' = (name: string) =>
    `//button[@class="accordion-button" and normalize-space(.//text())='${name}']`;

  async getOrderDetails(): Promise<IOrderDetails> {
    const [orderNumber, assignedManager, totalPrice, orderStatus, delivery, createdOn] = await Promise.all([
      this.getText(this['Key details']('Order number: ')),
      this.getText(this['Key details']('Assigned Manager: ')),
      this.getText(this['Key details']('Total Price')),
      this.getText(this['Key details']('Order Status')),
      this.getText(this['Key details']('Delivery')),
      this.getText(this['Key details']('Created On: '))
    ]);

    return {
      orderNumber,
      assignedManager,
      totalPrice,
      orderStatus,
      delivery,
      createdOn
    };
  }

  async getCustomerDetails(): Promise<ICustomerDetails> {
    const [email, name, country, city, street, house, flat, phone, createdOn, notes] = await Promise.all([
      this.getText(this['Key details']('Email: ')),
      this.getText(this['Key details']('Name: ')),
      this.getText(this['Key details']('Country: ')),
      this.getText(this['Key details']('City: ')),
      this.getText(this['Key details']('Street: ')),
      this.getText(this['Key details']('House: ')),
      this.getText(this['Key details']('Flat: ')),
      this.getText(this['Key details']('Phone: ')),
      this.getText(this['Key details']('Created On: ')),
      this.getText(this['Key details']('Notes: '))
    ]);

    return {
      email,
      name,
      country,
      city,
      street,
      house,
      flat,
      phone,
      createdOn,
      notes
    };
  }

  async refreshOrder() {
    await this.click(this['Refresh order button']);
  }

  async getRequestedProductDetails(): Promise<IRequestedProductDetails> {
    const [name, price, manufacturer, notes] = await Promise.all([
      this.getText(this['Key details']('Name')),
      this.getText(this['Key details']('Price')),
      this.getText(this['Key details']('Manufacturer')),
      this.getText(this['Key details']('Notes'))
    ]);

    return { name, price, manufacturer, notes };
  }

  async collapseRequstedProduct(name: string, collapse: boolean) {
    collapse.toString() !== (await this.getElementAttribute(this['Accordion button'](name), 'aria-expanded')) &&
      (await this.click(this['Accordion button'](name)));
  }
}
