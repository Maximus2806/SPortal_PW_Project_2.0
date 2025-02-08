import { BaseModal } from './baseModal.page';

export class DeleteModalPage extends BaseModal {
  protected readonly 'Action button' = `button[class*="btn-danger"]`;
  protected readonly 'Cancel button' = `//button[.='Cancel']`;
  readonly uniqueElement = `i.bi.bi-trash.me-2`;
}
