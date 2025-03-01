import { SalesPortalPage } from '../salesPortal.page';
import { TTableFields } from '../../../data/types/products/productSortFields';

export class ProductsListPage extends SalesPortalPage {
  readonly ['Add New Product'] = this.findElement('button.page-title-button');
  readonly Title = "//h2[.='Products List ']";
  readonly uniqueElement: string = this.Title;
  readonly ['Table row'] = (productName: string) => `//tr[./td[.="${productName}"]]`;
  readonly ['Product name in table'] = (productName: string) => `${this['Table row'](productName)}/td[1]`;
  readonly ['Product price in table'] = (productName: string) => `${this['Table row'](productName)}/td[2]`;
  readonly ['Product manufacturer in table'] = (productName: string) => `${this['Table row'](productName)}/td[3]`;
  readonly ['Product creation date in table'] = (productName: string) => `${this['Table row'](productName)}/td[4]`;
  readonly ['Product Delete button in table'] = (productName: string) =>
    `${this['Table row'](productName)}//button[@title="Delete"]`;
  readonly ['Product Details button in table'] = (productName: string) =>
    `${this['Table row'](productName)}//button[@title="Details"]`;
  readonly ['Edit product button in table'] = (productName: string) =>
    `${this['Table row'](productName)}//button[@title="Edit"]`;
  readonly ['Search Button'] = 'button#search-products';
  readonly ['Search input'] = "input[type='search']";
  readonly ['Table body'] = '//tbody/tr';
  readonly ['Sorting arrow down'] = '.bi-arrow-down';
  readonly ['Sorting arrow up'] = '.bi-arrow-up';
  readonly ['Product header title'] = (title: TTableFields) => `//table/thead/tr//div[.='${title}']`;

  async clickOnAddNewProduct() {
    await this.click(this['Add New Product']);
  }

  async clickOnEditProductButton(productName: string) {
    await this.click(this['Edit product button in table'](productName));
  }

  async getProductFromTable(productName: string) {
    const [name, price, manufacturer, createdOn] = await Promise.all([
      this.getText(this['Product name in table'](productName)),
      this.getText(this['Product price in table'](productName)),
      this.getText(this['Product manufacturer in table'](productName)),
      this.getText(this['Product creation date in table'](productName))
    ]);
    return {
      name,
      price: +price.replace('$', ''),
      manufacturer,
      createdOn
    };
  }

  async getProductsFromTable() {
    const tableRows = await this.findElementArray(this['Table body']);
    const results = await Promise.all(
      await tableRows.map(async (_, i) => {
        const name = await this.getText(`${this['Table body']}[${i + 1}]/td[1]`);
        const price = await this.getText(`${this['Table body']}[${i + 1}]/td[2]`);
        const manufacturer = await this.getText(`${this['Table body']}[${i + 1}]/td[3]`);
        const createdOn = await this.getText(`${this['Table body']}[${i + 1}]/td[4]`);
        return {
          name,
          price: +price.replace('$', ''),
          manufacturer,
          createdOn
        };
      })
    );
    return results;
  }

  async getSearchResults(searchInput: string) {
    await this.fillSearchInput(searchInput);
    await this.clickOnSearchButton();
    await this.waitForSpinnersToHide();
    const firstRowColumns = await this.findElementArray(`${this['Table body']}[1]/td`);
    if (firstRowColumns.length === 1) {
      return await this.getText(`${this['Table body']}[1]/td`);
    }
    return await this.getProductsFromTable();
  }

  async clickOnDeleteProductButton(productName: string) {
    await this.click(this['Product Delete button in table'](productName));
  }

  async clickOnProductDetailsButton(productName: string) {
    await this.click(this['Product Details button in table'](productName));
  }

  async clickOnSearchButton() {
    await this.click(this['Search Button']);
  }

  async fillSearchInput(productName: string) {
    await this.setValue(this['Search input'], productName);
  }

  async clickOnColumnTitle(title: TTableFields) {
    await this.click(this['Product header title'](title));
  }

  async getHeaderAtribute(header: TTableFields, name: string) {
    return await this.getElementAttribute(this['Product header title'](header), name);
  }
}
