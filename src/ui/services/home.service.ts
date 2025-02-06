import { expect, Page } from '@playwright/test';
import { CustomersListPage } from '../pages/customers/customers.page';
import { HomePage } from '../pages/home.page';
import { Metric } from '../../data/types/home.types';
// import numeral from 'numeral';
import { ProductsListPage } from '../pages/products/products.page';
import { logStep } from '../../utils/reporter/logStep';

export class HomePageService {
  private homePage: HomePage;
  private customersPage: CustomersListPage;
  private productsPage: ProductsListPage;
  constructor(protected page: Page) {
    this.homePage = new HomePage(page);
    this.customersPage = new CustomersListPage(page);
    this.productsPage = new ProductsListPage(page);
  }

  @logStep()
  async openCustomersPage() {
    await this.homePage.clickOnViewDetailsButton('Customers');
    await this.homePage.waitForSpinnerToHide();
    await this.customersPage.waitForOpened();
  }

  @logStep()
  async openProductsPage() {
    await this.homePage.clickOnViewDetailsButton('Products');
    await this.homePage.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();
  }

  async validateMetric(metric: Metric, value: number) {
    const actualValue = await this.homePage.getMetricValue(metric);
    let expectedValue: string | number;
    switch (metric) {
    case 'Total Orders': {
      expectedValue = value;
      break;
    }
    case 'Total Revenue': {
      expectedValue = `$${numeral(value).format('0.0a')}`;
      break;
    }

    case 'Avg Order Value': {
      expectedValue = `$${numeral(value).format('0.0a')}`;
      break;
    }

    case 'Canceled Orders': {
      expectedValue = value;
      break;
    }
    case 'New Customers': {
      expectedValue = value;
      break;
    }
    }
    expect(actualValue).toBe(expectedValue);
  }

  async checkMetricLayout(metric: Metric) {
    const container = this.homePage.getMetricContainer(metric);
    await expect(container).toHaveScreenshot();
  }

  async checkOrderChartLayout() {
    const container = this.homePage['Orders chart container'];
    await expect(container).toHaveScreenshot();
  }
}
