import { COUNTRIES } from '../../../data/customers/countries';
import { SalesPortalPage } from '../salesPortal.page';

export class CustomersListPage extends SalesPortalPage {
  uniqueElement = '//h2[text()="Customers List "]';

  readonly 'Add New Customer button' = 'button.page-title-header';
  readonly 'Edit button by table row' = (customer: string) =>
    `${this['Table row selector'](customer)}//button[@title="Edit"]`;
  readonly 'Empty table message' = 'td.fs-italic';
  readonly 'Filter button' = 'button#filter';
  readonly 'Filter check-box' = (country: COUNTRIES) => `#${country.replace(/ /g, '\\ ')}-filter`;
  readonly 'Apply filter button' = '#apply-filters';
  readonly ['Table Rows'] = '//tbody/tr';

  async clickOnAddNewCustomer() {
    await this.click(this['Add New Customer button']);
  }

  async clickOnEditCustomer(customerName: string) {
    await this.click(this['Edit button by table row'](customerName));
  }

  async getEmptyTableMessage() {
    return this.getText(this['Empty table message']);
  }

  async clickOnFilterButton() {
    await this.click(this['Filter button']);
  }

  async getAllCustomersFromTable() {
    const tableRows = await this.findElementArray(this['Table Rows']);

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
}
