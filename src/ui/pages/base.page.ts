import { Locator, Page } from '@playwright/test';
import { IWaitUntilOptions } from '../../data/types/page/waitUntil.types';

const TIMEOUT_5_SECS = 5000;
const DEFAULT_TIMEOUT = 10000;

export type Selector = string | Locator;

export function isSelector(selector: Selector): selector is string {
  return typeof selector === 'string';
}

export abstract class BasePage {
  constructor(protected page: Page) {}

  protected findElement(locator: string | Locator) {
    return isSelector(locator) ? this.page.locator(locator) : locator;
  }

  async findElementArray(selectorOrElement: string | Locator) {
    const elements = !isSelector(selectorOrElement)
      ? await selectorOrElement.all()
      : await this.findElement(selectorOrElement).all();
    return elements;
  }

  protected async waitForElement(
    selector: string | Locator,
    state: 'attached' | 'detached' | 'visible' | 'hidden' = 'visible',
    timeout = DEFAULT_TIMEOUT
  ) {
    const element = this.findElement(selector);
    await element.waitFor({ state, timeout });
    return element;
  }

  protected async waitForElementAndScroll(selector: string | Locator, timeout = DEFAULT_TIMEOUT) {
    const element = await this.waitForElement(selector, 'visible');
    try {
      await element.scrollIntoViewIfNeeded({ timeout });
      return element;
    } catch (error) {
      throw error;
    }
  }

  protected async click(locator: string | Locator, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElementAndScroll(locator, timeout);
    await element.click();
  }

  protected async setValue(locator: string | Locator, value: string | number, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElementAndScroll(locator, timeout);
    await element.fill(String(value), { timeout });
  }

  protected async getText(locator: string | Locator, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElementAndScroll(locator, timeout);
    return await element.innerText({ timeout });
  }

  protected async getElementAttribute(locator: string | Locator, attribute: string) {
    return await this.findElement(locator).getAttribute(attribute);
  }

  protected async checkCheckbox(locator: string | Locator, shouldCheck: boolean, timeout = DEFAULT_TIMEOUT) {
    const element = await this.waitForElementAndScroll(locator, timeout);
    const isChecked = await element.isChecked();
    if (isChecked !== shouldCheck) {
      await element.setChecked(shouldCheck);
    }
  }

  protected async selectDropdownValue(
    dropdownLocator: string | Locator,
    value: string | number,
    timeout = TIMEOUT_5_SECS
  ) {
    const element = await this.waitForElementAndScroll(dropdownLocator, timeout);
    await element.selectOption(String(value), { timeout });
  }

  protected async openPage(url: string) {
    await this.page.goto(url);
  }

  async waitUntil(condition: () => Promise<boolean>, options?: IWaitUntilOptions) {
    const interval = options?.interval ?? 500;
    const timeout = options?.timeout ?? 10000;
    const timeoutMessage = options?.timeoutMsg || `Condition not met within the specified timeout.`;
    let elapsedTime = 0;

    while (elapsedTime < timeout) {
      if (await condition()) {
        return;
      }

      await this.page.waitForTimeout(interval);
      elapsedTime += interval;
    }

    throw new Error(timeoutMessage);
  }
}
