import { BaseModal } from '../base.modal';

class DeleteProductModal extends BaseModal {
  readonly ['Modal container'] = '//div[@role="dialog"]';

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this['Modal container']);
  }

  async waitForDisappeared() {
    await this.waitForDisplayed(this['Modal container'], true);
  }

  async clickOnActionButton() {
    await this.click(this['Action button']);
  }

  async clickOnCloseModalButton() {
    await this.click(this['Close modal button']);
  }

  async clickOnCancelButton() {
    await this.click(this['Cancel button']);
  }
}

export default new DeleteProductModal();
