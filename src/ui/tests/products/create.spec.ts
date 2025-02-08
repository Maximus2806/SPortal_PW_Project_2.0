import { test as ui } from '../../../fixtures/services.fixture';
import { test as api } from '../../../fixtures/apiServices.fixture';
import { mergeTests } from 'playwright/test';
import { TAGS } from '../../../data/tags';
import { IProduct } from '../../../data/types/products/product.types';
import { productToastMessages } from '../../../data/Products/products.data';

const test = mergeTests(ui, api);

let product: IProduct, token: string;
test.beforeAll(async ({ signInApiService }) => {
  token = await signInApiService.signInAsAdmin();
});

test(
  'Should create product and verify its data in details modal',
  { tag: [TAGS.SMOKE] },
  async ({ homePageService, productsPageService, addNewProductPageService, signInPageService }) => {
    await signInPageService.openSalesPortal();
    await homePageService.openProductsPageViaSidebar();
    await productsPageService.openAddNewProductPage();
    product = await addNewProductPageService.createNewProduct();
    await productsPageService.verifyNotification(productToastMessages.created);
    await productsPageService.verifyProductDataInModal(product);
  }
);

test(
  'Should create product and verify its data in table',
  { tag: [TAGS.SMOKE] },
  async ({ homePageService, productsPageService, addNewProductPageService, signInPageService }) => {
    await signInPageService.openSalesPortal();
    await homePageService.openProductsPageViaSidebar();
    await productsPageService.openAddNewProductPage();
    product = await addNewProductPageService.createNewProduct();
    await productsPageService.verifyNotification(productToastMessages.created);
    await productsPageService.verifyProductDataInTable(product);
  }
);

test.afterEach(async ({ productApiService }) => {
  await productApiService.deleteProductWithName(product.name, token);
});
