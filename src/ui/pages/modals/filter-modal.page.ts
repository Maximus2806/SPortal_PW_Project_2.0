import { UnionFilterModalLabels } from '../../../data/types/common.types';
import { BaseModal } from './baseModal.page';

export class FilterModalPage extends BaseModal {
  protected readonly 'Action button' = `#apply-filters`;
  protected readonly 'Cancel button' = `${this.constructor.name} - do not contain cancel button`;
  protected readonly 'Clear filters button' = `#clear-filters`;
  readonly uniqueElement = `i.bi.bi-filter.me-2`;
  protected readonly ['Filter checkbox'] = (filterName: string) => `//input[@id="${filterName}-filter"]`;

  async clickOnClearFiltersButton() {
    await this.click(this['Clear filters button']);
  }

  async clickOnActionButton() {
    await this.click(this['Action button']);
  }

  async checkFilterBox(labels: UnionFilterModalLabels[]) {
    await Promise.all(labels.map((label) => this.click(this['Filter checkbox'](label))));
  }
}
