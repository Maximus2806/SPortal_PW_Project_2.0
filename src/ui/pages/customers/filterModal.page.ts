import { COUNTRIES } from '../../../data/customers/countries';
import { BaseModal } from '../modals/baseModal.page';

export class FilterModal extends BaseModal {
  uniqueElement = '.modal-title';
  readonly 'Filter check-box' = (country: COUNTRIES) => `#${country.replace(/ /g, '\\ ')}-filter`;
  readonly 'Action button' = '#apply-filters';
  readonly 'Cancel button' = '#clear-filters';

  async clickOnActionButton() {
    await this.click(this['Action button']);
  }

  async clickOnCancelButton() {
    await this.click(this['Cancel button']);
  }

  async clickOnCloseModalButton() {
    await this.click(this['Close modal button']);
  }

  async setFilter(value: COUNTRIES) {
    await this.checkCheckbox(this['Filter check-box'](value), true);
  }

  async applyFilter() {
    await this.clickOnActionButton();
  }
}
