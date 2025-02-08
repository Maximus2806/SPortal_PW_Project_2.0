import { AddEditProductPage } from './addEditProduct.page';

export class EditProductPage extends AddEditProductPage {
  readonly ['Save Product button'] = '#save-product-changes';
  readonly uniqueElement: string = '//h2[contains(text(), "Edit")]';
  protected readonly ['Delete product button'] = this.findElement(`//button[@id="delete-product-btn"]`);

  async clickOnDeleteProductButton() {
    await this.click(this['Delete product button']);
  }
}
