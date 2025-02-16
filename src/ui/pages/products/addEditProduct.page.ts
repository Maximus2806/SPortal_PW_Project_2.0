import { Locator } from '@playwright/test';
import { AddProductFields, IProduct } from '../../../data/types/products/product.types';
import { SalesPortalPage } from '../salesPortal.page';

export abstract class AddEditProductPage extends SalesPortalPage {
  abstract readonly ['Save Product button']: string | Locator;

  readonly ['Name input'] = this.findElement('#inputName');
  readonly ['Manufacturer dropdown'] = this.findElement('#inputManufacturer');
  readonly ['Price input'] = this.findElement('#inputPrice');
  readonly ['Amount input'] = this.findElement('#inputAmount');
  readonly ['Notes textarea'] = this.findElement('#textareaNotes');
  readonly ['Products link'] = this.findElement('.back-link');

  async fillInputs(product: Partial<IProduct>) {
    await this.page.waitForTimeout(300);
    if (product.name) await this.setValue(this['Name input'], product.name);
    if (product.manufacturer) await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer);
    if (product.price) await this.setValue(this['Price input'], product.price);
    if (product.amount) await this.setValue(this['Amount input'], product.amount);
    if (product.notes) await this.setValue(this['Notes textarea'], product.notes);
  }

  async clickOnSaveButton() {
    await this.click(this['Save Product button']);
  }

  async clickOnProductsLink() {
    await this.click(this['Products link']);
  }
}
