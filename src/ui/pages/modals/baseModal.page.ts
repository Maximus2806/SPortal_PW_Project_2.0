import { SalesPortalPage } from '../salesPortal.page';

export abstract class BaseModal extends SalesPortalPage {
  protected abstract readonly ['Action button']: string;
  protected abstract readonly ['Cancel button']: string;
  protected readonly ['Close modal button'] = '//div[@class="modal-header"]/button';

  async clickOnCancelButton() {
    await this.click(this['Cancel button']);
  }

  async clickOnCloseModalButton() {
    await this.click(this['Close modal button']);
  }

  async clickOnActionButton() {
    await this.click(this['Action button']);
  }
}
