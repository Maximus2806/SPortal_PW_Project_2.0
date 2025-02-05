import { BasePage } from './base.page.js';

export abstract class SalesPortalPage extends BasePage {
  protected readonly spinner = this.findElement('.spinner-border');
  protected readonly notification = this.findElement('.toast-body').last();
  abstract readonly uniqueElement: string;

  async waitForOpened() {
    await this.waitForElement(this.uniqueElement);
    await this.waitForSpinnersToHide();
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.spinner, 'hidden', 30000);
  }

  async getLastNotificationText() {
    return this.getText(this.notification);
  }

  async waitForSpinnersToHide() {
    await this.waitUntil(
      async () => {
        const spinners = await this.findElementArray(this.spinner);
        return !spinners.length;
      },
      {
        timeout: 30000,
        timeoutMsg: 'At least 1 spinner is still displayed',
        interval: 300
      }
    );
  }
}
