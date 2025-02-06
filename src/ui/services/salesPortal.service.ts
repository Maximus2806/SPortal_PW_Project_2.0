import { expect, Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';

export abstract class SalesPortalPageService {
  protected page: Page;
  protected homePage: HomePage;
  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
  }

  async validateNotification(text: NOTIFICATIONS) {
    const notificationText = await this.homePage.getLastNotificationText();
    expect(notificationText, `Should display notification with text: ${text}`).toBe(text);
  }

}
