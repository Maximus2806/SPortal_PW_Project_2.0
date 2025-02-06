import homePage from '../../pages/home.page';
import logInPageService from '../../services/logInPage.service';
import { generateProductData } from '../../../data/Products/generateProduct';
import { NOFITICATIONS } from '../../../data/notifications';
import _ from 'lodash';
import homePageService from '../../services/homePage.service';
import productsPageService from '../../services/Products/productsPage.service';
import addNewProductPageService from '../../services/Products/addNewProductPage.service';

describe('[UI] [Products] E2E three layer structure', () => {
  const newProduct = generateProductData();

  beforeEach(async function () {
    await logInPageService.openSalesPortal();
    await logInPageService.loginAsAdmin();
    await homePage.waitForPageOpened();
    await homePageService.openProductsPage();
    await productsPageService.openAddNewProductPage();
  });

  afterEach(async function () {
    await productsPageService.deleteProduct(newProduct.name);
    await productsPageService.validateNotification(NOFITICATIONS.PRODUCT_DELETED);
    await logInPageService.signOut();
  });

  it('Should create product and verify data in modal window', async function () {
    const createdProduct = await addNewProductPageService.createNewProduct(newProduct);
    await productsPageService.validateNotification(NOFITICATIONS.PRODUCT_CREATED);
    await productsPageService.validateProductDataFromNodal(createdProduct);
  });
  it('Should create product and find it whith search', async function () {
    const createdProduct = await addNewProductPageService.createNewProduct(newProduct);
    await productsPageService.validateNotification(NOFITICATIONS.PRODUCT_CREATED);
    await productsPageService.validateProductDataFromNodal(createdProduct);
    await browser.pause(2000);
    await productsPageService.validateSearchSingleProduct(createdProduct.name, createdProduct);
  });
});
