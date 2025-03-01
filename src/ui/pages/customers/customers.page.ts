import { COUNTRIES } from '../../../data/customers/countries';
import { NOTIFICATIONS } from '../../../data/notifications';
import { TCustomerTableFields } from '../../../data/types/customers/customerSort.types';
import { SalesPortalPage } from '../salesPortal.page';

export class CustomersListPage extends SalesPortalPage {
  uniqueElement = '//h2[text()="Customers List "]';

  readonly ['Customer header title'] = (title: TCustomerTableFields) => `//table/thead/tr//div[.='${title}']`;
  readonly ['Add New Customer button'] = 'button.page-title-header';
  readonly ['Table row selector'] = (customer: string) => `//tr[./td[.="${customer}"]]`;
  readonly ['Empty table message'] = 'td.fs-italic';
  readonly ['Filter button'] = 'button#filter';
  readonly ['Filter check-box'] = (country: COUNTRIES) => `#${country.replace(/ /g, '\\ ')}-filter`;
  readonly ['Apply filter button'] = '#apply-filters';
  readonly ['Table Rows'] = '//tbody/tr';
  readonly ['Customer Table Row by email'] = (email: string) => this.findElement(`tbody tr`).filter({ hasText: email });
  readonly ['Edit button by email'] = (email: string) =>
    this.findElement('tbody tr').filter({ hasText: email }).locator('button[title="Edit"]');
  readonly ['Details button by email'] = (email: string) =>
    this.findElement('tbody tr').filter({ hasText: email }).locator('button[title="Details"]');
  readonly ['Delete button by email'] = (email: string) =>
    this.findElement('tbody tr').filter({ hasText: email }).locator('button[title="Delete"]');

  async clickOnAddNewCustomer() {
    await this.click(this['Add New Customer button']);
  }

  async clickOnEditCustomer(customerName: string) {
    await this.click(this['Edit button by email'](customerName));
  }

  async clickOnCustomerDetails(customerEmail: string) {
    await this.click(this['Details button by email'](customerEmail));
  }

  async clickOnDeleteCustomer(customerEmail: string) {
    console.log(this['Delete button by email'](customerEmail));
    await this.click(this['Delete button by email'](customerEmail));
  }

  async getEmptyTableMessage() {
    return this.getText(this['Empty table message']);
  }

  async clickOnFilterButton() {
    await this.click(this['Filter button']);
  }

  async getCustomerFromTable(customerEmail: string) {
    const [email, name, country, createdOn] = await Promise.all(
      (await this['Customer Table Row by email'](customerEmail).locator('td').all()).map((td) => this.getText(td))
    );
    return { email, name, country, createdOn };
  }

  async getAllCustomersFromTable() {
    const tableRows = await this.findElementArray(this['Table Rows']);
    if (tableRows.length === 1) {
      const firstRowText = await this.getText(`${this['Table Rows']}/td[1]`);
      if (firstRowText === NOTIFICATIONS.NO_SEARCH_RESULTS) {
        return [];
      }
    }
    const table = await Promise.all(
      await tableRows.map(async (el, i) => {
        const email = await this.getText(`${this['Table Rows']}[${i + 1}]/td[1]`);
        const name = await this.getText(`${this['Table Rows']}[${i + 1}]/td[2]`);
        const country = await this.getText(`${this['Table Rows']}[${i + 1}]/td[3]`);
        const createdOn = await this.getText(`${this['Table Rows']}[${i + 1}]/td[4]`);
        return {
          email,
          name,
          country,
          createdOn
        };
      })
    );
    return table;
  }

  async getHeaderAttribute(header: TCustomerTableFields, name: string) {
    return await this.getElementAttribute(this['Customer header title'](header), name);
  }

  async clickOnColumnTitle(title: TCustomerTableFields) {
    await this.click(this['Customer header title'](title));
  }
}
