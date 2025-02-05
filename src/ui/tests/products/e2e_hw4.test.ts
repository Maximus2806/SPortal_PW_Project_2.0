import homePage from '../../pages/home.page';
import loginPage from '../../pages/logIn.page';
import productsPage from '../../pages/Products/products.page';
import addNewProductPage from '../../pages/Products/addNewProduct.page';
import { generateProductData } from '../../../data/Products/generateProduct';
import { NOFITICATIONS } from '../../../data/notifications';
import deleteProductModal from '../../pages/Products/deleteProductModal';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../../config/environment';
import _ from 'lodash';

describe('[UI] [Products] E2E two layer structure', () => {
  beforeEach(async function () {
    await loginPage.open();
    await loginPage.waitForPageOpened();
    await loginPage.fillCredentials({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
    await loginPage.clickOnLoginButton();
    await homePage.waitForPageOpened();
  });

  afterEach(async function () {
    await loginPage.deleteCookies(['Authorization']);
  });
  it('Should create product, then delete it and verify it is not presented in table', async function () {
    await homePage.clickOnMenuButton('Products');
    await productsPage.waitForPageOpened();
    await productsPage.clickOnAddNewProduct();
    await addNewProductPage.waitForPageOpened();
    const newProductData = generateProductData();
    await addNewProductPage.fillInputs(newProductData);
    await addNewProductPage.clickOnSaveButton();
    const notificationText = await productsPage.getNotificationText(NOFITICATIONS.PRODUCT_CREATED);
    expect(notificationText).toBe(NOFITICATIONS.PRODUCT_CREATED);
    await productsPage.clickNotificationCloseIcon();
    const cratedProduct = await productsPage.getProductFromTable(newProductData.name);
    await expect(cratedProduct).toMatchObject({ ..._.omit(newProductData, ['amount', 'notes']) });
    await productsPage.clickOnDeleteProductButton(cratedProduct.name);
    await deleteProductModal.clickOnActionButton();
    const deleteNotificationText = await productsPage.getNotificationText(NOFITICATIONS.PRODUCT_DELETED);
    expect(deleteNotificationText).toBe(NOFITICATIONS.PRODUCT_DELETED);
    const productInSearch = await productsPage.getSearchResults(cratedProduct.name);
    expect(productInSearch).toBe('No records created yet');
  });
});
