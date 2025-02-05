import { SalesPortalPage } from '../salesPortal.page.js';

export class OrdersPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[.="Orders List "]';
  private readonly 'Header sort button' = (header: string) => `//*[@name="sort-button" and @fieldName='${header}']`;
  private readonly 'Table row selector' = (product: string) => `//tr[./td[text()="${product}"]]`;
  private readonly 'Order Number' = (product: string) => `${this['Table row selector'](product)}/td[1]`;
  private readonly 'Name' = (product: string) =>
    `${this['Table row selector'](product)}/td[${this.getHeaderPosition('Name')}]`;
  private readonly 'Email' = (product: string) =>
    `${this['Table row selector'](product)}/td[${this.getHeaderPosition('Email')}]`;
  private readonly 'Price' = (product: string) =>
    `${this['Table row selector'](product)}/td[${this.getHeaderPosition('Price')}]`;
  private readonly 'Delivery' = (product: string) =>
    `${this['Table row selector'](product)}/td[${this.getHeaderPosition('Delivery')}]`;
  private readonly 'Status' = (product: string) =>
    `${this['Table row selector'](product)}/td[${this.getHeaderPosition('Status')}]`;
  private readonly 'Created' = (product: string) =>
    `${this['Table row selector'](product)}/td[${this.getHeaderPosition('Created')}]`;
  private readonly 'Order details' = (product: string) =>
    `${this['Table row selector'](product)}/td[${this.getHeaderPosition('Order details')}]/button[1]`;
  private readonly 'Create Order' = `//button[contains(@class, 'page-title-button') and starts-with(., 'Create Order')]`;
  private readonly 'Filter' = `#filter`;
  private readonly 'Search bar' = `//*[contains(@class, 'search-bar')]`;
  private readonly 'Search orders button' = `#search-orders`;

  async clickOnCreateOrder() {
    await this.click(this['Create Order']);
  }

  async clickOnDetailsButton(name: string) {
    await this.click(this['Order details'](name));
  }

  async clickOnFilterButton() {
    await this.click(this['Filter']);
  }

  async fillSearchInput(filterValue: string) {
    await this.setValue(`${this['Search bar']}//input`, filterValue);
  }

  async clickOnSearchButton() {
    await this.click(`${this['Search bar']}`);
  }

  async sortTable(header: string, direction: 'asc' | 'desc') {
    const sortButton = this['Header sort button'](header);
    const attribute = await this.getElementAttribute(sortButton, 'direction');
    if (attribute !== direction) {
      await this.click(sortButton);
    }
  }
}
