import { BaseModal } from '../modals/baseModal.page';

export class ProductDetailsModal extends BaseModal {
  readonly uniqueElement = '.bi.bi-box-seam.me-2';
  readonly ['Modal container'] = `//div[@id="details-modal-container"]`;
  readonly ['Row value by row name'] = (row: string) => `//h6[./*[.='${row}:']]/following-sibling::p`;
  protected readonly ['Action button'] = `//button[.='Edit Product']`;
  protected readonly ['Cancel button'] = `//div[@id="Product-details-modal-id"]//button[.='Cancel']`;

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
