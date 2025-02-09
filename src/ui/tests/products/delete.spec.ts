import { test as ui } from '../../../fixtures/services.fixture';
import { test as api } from '../../../fixtures/apiServices.fixture';
import { mergeTests } from 'playwright/test';
import { TAGS } from '../../../data/tags';
import { IProduct, IProductFromResponse } from '../../../data/types/products/product.types';
import { productToastMessages } from '../../../data/products/products.data';

const test = mergeTests(ui, api);

let product: IProduct | IProductFromResponse, token: string;

test.beforeAll(async ({ signInApiService }) => {
  token = await signInApiService.signInAsAdmin();
});

test.beforeEach(async ({ productApiService }) => {
  product = await productApiService.create({}, token);
});

test(
  'Should delete product on "Products list" page',
  { tag: [TAGS.SMOKE] },
  async ({ homePageService, productsPageService, signInPageService }) => {
    await signInPageService.openSalesPortal();
    await homePageService.openProductsPageViaSidebar();
    await productsPageService.deleteProduct(product.name);

    await productsPageService.verifyNotification(productToastMessages.deleted);
  }
);

test(
  'Should delete product on "Edit" page',
  { tag: [TAGS.SMOKE] },
  async ({ homePageService, productsPageService, editProductPageService, signInPageService }) => {
    await signInPageService.openSalesPortal();
    await homePageService.openProductsPageViaSidebar();
    await productsPageService.openEditPageForProductWithName(product.name);
    await editProductPageService.delete();

    await productsPageService.verifyNotification(productToastMessages.deleted);
  }
);

test.afterEach(async ({ productApiService }) => {
  const productName = (await productApiService.getProductsWithSearch(product.name)).at(-1)?.name;
  if (productName) await productApiService.deleteProductWithName(productName, token);
});
