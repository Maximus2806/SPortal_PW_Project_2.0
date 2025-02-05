import { test as servicesFixture, expect } from '../../../fixtures/services.fixture';
import { test as pagesFixture } from '../../../fixtures/pages.fixture';
import { COUNTRIES } from '../../../data/customers/countries';
import { mergeTests } from '@playwright/test';

const test = mergeTests(servicesFixture, pagesFixture);
test.describe('[UI] [Customers] [Filter]', async () => {
  test.beforeEach('Open Customers page', async function ({ signInPage, homePage, homePageService }) {
    await signInPage.openLoginPage();
    await homePage.waitForOpened();
    await homePageService.openCustomersPage();
  });
  const countries = Object.values(COUNTRIES);
  countries.forEach((country) => {
    test(`Should filter customers by ${country}`, async function ({ customersPageService }) {
      await customersPageService.applyCountryFilter(country);
      await customersPageService.validateFilterResults(country);
    });
  });
});
