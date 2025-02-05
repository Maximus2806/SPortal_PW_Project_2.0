import { BaseModal } from '../base.modal';

class ProductDetailsModal extends BaseModal {
  readonly ['Modal container'] = `//div[@id="details-modal-container"]`;
  readonly ['Row value by row name'] = (row: string) =>
    `//div[@class='modal-body']//strong[text()='${row}:']/parent::h6/following-sibling::p`;

  async clickOnActionButton() {
    await this.click(this['Action button']);
  }

  async clickOnCancelButton() {
    await this.click(this['Cancel button']);
  }

  async clickOnCloseModalButton() {
    await this.click(this['Close modal button']);
  }

  async waitForPageOpened() {
    await this.waitForDisplayed(this['Modal container']);
    await this.waitForSpinnersToBeHidden('Product details modal');
  }

  async waitForDisappeared() {
    await this.waitForDisplayed(this['Modal container'], true);
  }

  async getProductData() {
    const [name, amount, price, manufacturer, createdOn, notes] = await Promise.all([
      this.getText(this['Row value by row name']('Name')),
      this.getText(this['Row value by row name']('Amount')),
      this.getText(this['Row value by row name']('Price')),
      this.getText(this['Row value by row name']('Manufacturer')),
      this.getText(this['Row value by row name']('Created On')),
      this.getText(this['Row value by row name']('Notes'))
    ]);
    return { name, amount: +amount, price: +price, manufacturer, createdOn, notes };
  }
}

export default new ProductDetailsModal();
