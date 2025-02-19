import { test as ui } from '../../../fixtures/services.fixture';
import { test as api } from '../../../fixtures/apiServices.fixture';
import { mergeTests } from 'playwright/test';
import { TAGS } from '../../../data/tags';
import { IProduct, IProductFromResponse } from '../../../data/types/products/product.types';
import { productToastMessages } from '../../../data/productss/products.data';
import { generateProductData } from '../../../data/productss/generateProduct';

const test = mergeTests(ui, api);

let product: IProduct | IProductFromResponse, existedProduct: IProductFromResponse, token: string;

test.beforeAll(async ({ signInApiService }) => {
  token = await signInApiService.signInAsAdmin();
});

test.beforeEach(async ({ productApiService }) => {
  product = await productApiService.create({}, token);
});

test(
  'Should update product and verify its data in details modal',
  { tag: [TAGS.SMOKE] },
  async ({ homePageService, productsPageService, editProductPageService, signInPageService }) => {
    await signInPageService.openSalesPortal();
    await homePageService.openProductsPageViaSidebar();
    await productsPageService.openEditPageForProductWithName(product.name);
    product = await editProductPageService.update();

    await productsPageService.verifyNotification(productToastMessages.updated);
    await productsPageService.verifyProductDataInModal(product);
  }
);

test(
  'Should update product and verify its data in table',
  { tag: [TAGS.SMOKE] },
  async ({ homePageService, productsPageService, editProductPageService, signInPageService }) => {
    await signInPageService.openSalesPortal();
    await homePageService.openProductsPageViaSidebar();
    await productsPageService.openEditPageForProductWithName(product.name);
    product = await editProductPageService.update();

    await productsPageService.verifyNotification(productToastMessages.updated);
    await productsPageService.verifyProductDataInTable(product);
  }
);

test(
  'Should get error when updating product with an existing name',
  { tag: [TAGS.REGRESSION] },
  async ({ homePageService, productApiService, productsPageService, editProductPage, signInPageService }) => {
    existedProduct = await productApiService.create();

    await signInPageService.openSalesPortal();
    await homePageService.openProductsPageViaSidebar();
    await productsPageService.openEditPageForProductWithName(product.name);
    await editProductPage.fillInputs(generateProductData({ name: existedProduct.name }));
    await editProductPage.clickOnSaveButton();

    await productsPageService.verifyNotification(productToastMessages['already exist'](existedProduct.name));
  }
);

test.afterEach(async ({ productApiService }) => {
  if (existedProduct?.name) await productApiService.deleteProductWithName(existedProduct.name, token);
  await productApiService.deleteProductWithName(product.name, token);
});
