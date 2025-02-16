import { test as ui } from '../../../fixtures/services.fixture';
import { test as api } from '../../../fixtures/apiServices.fixture';
import { mergeTests } from 'playwright/test';
import { TAGS } from '../../../data/tags';
import { IProductFromResponse } from '../../../data/types/products/product.types';
import { ESortOrder } from '../../../data/types/api.types';
import { TTableFields } from '../../../data/types/products/productSortFields';

const test = mergeTests(ui, api);

let token: string, products: IProductFromResponse[];
test.beforeAll(async ({ signInApiService, productApiService }) => {
  token = await signInApiService.signInAsAdmin();
  await productApiService.populateProducts(5);
  products = productApiService.getCreatedProducts();
});

for (const key of ['Name', 'Price', 'Manufacturer', 'Created On']) {
  for (const order of Object.values(ESortOrder)) {
    test(
      `Should display products in table sorted by "${key}" in "${order}" order`,
      { tag: [TAGS.REGRESSION] },
      async function ({ productsPageService, signInPageService, homePageService }) {
        await signInPageService.openSalesPortal();
        await homePageService.openProductsPageViaSidebar();

        await productsPageService.verifySortResults(key as TTableFields, order);
      }
    );
  }
}

test.afterAll(async ({ productApiService }) => {
  for (const p of products) {
    await productApiService.delete(p._id, token);
  }
});
