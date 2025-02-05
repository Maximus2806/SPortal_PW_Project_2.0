import homePage from '../../pages/home.page';
import logInPageService from '../../services/logInPage.service';
import _ from 'lodash';
import homePageService from '../../services/homePage.service';
import productsPageService from '../../services/Products/productsPage.service';
import { PRODUCT_TABLE_HEADERS } from '../../../data/Products/productTableHeaders';

describe('[UI] [Products] Verify sorting correctness', () => {
  beforeEach(async function () {
    await logInPageService.openSalesPortal();
    await logInPageService.loginAsAdmin();
    await homePage.waitForPageOpened();
    await homePageService.openProductsPage();
  });

  afterEach(async function () {
    await logInPageService.signOut();
  });

  it('Sort table by Name in asc order and verify result', async function () {
    await productsPageService.verifySortingResults(PRODUCT_TABLE_HEADERS.NAME, 'asc');
  });

  it('Sort table by Name in desc order and verify result', async function () {
    await productsPageService.verifySortingResults(PRODUCT_TABLE_HEADERS.NAME, 'desc');
  });

  it('Sort table by Price in asc order and verify result', async function () {
    await productsPageService.verifySortingResults(PRODUCT_TABLE_HEADERS.PRICE, 'asc');
  });

  it('Sort table by Price in desc order and verify result', async function () {
    await productsPageService.verifySortingResults(PRODUCT_TABLE_HEADERS.PRICE, 'desc');
  });

  it('Sort table by Created On in asc order and verify result', async function () {
    await productsPageService.verifySortingResults(PRODUCT_TABLE_HEADERS.CREATED_ON, 'asc');
  });

  it('Sort table by Created On in desc order and verify result', async function () {
    await productsPageService.verifySortingResults(PRODUCT_TABLE_HEADERS.CREATED_ON, 'desc');
  });
});
