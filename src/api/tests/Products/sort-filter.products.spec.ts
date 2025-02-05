import { test, expect } from '../../../fixtures/apiServices.fixture';
import { ESortOrder } from '../../../data/types/api.types';
import { TAGS } from '../../../data/tags';
import { genericSort } from '../../../utils/sort-algorithm';
import { IProductFromResponse } from '../../../data/types/products/product.types';
import { ESortProductsFields } from '../../../data/types/products/productSortFields';
import { faker } from '@faker-js/faker';

test.describe('[API] [Products] Products sort and filtering', { tag: [TAGS.REGRESSION] }, async () => {
  let p1: IProductFromResponse,
    p2: IProductFromResponse,
    p3: IProductFromResponse,
    p4: IProductFromResponse,
    p5: IProductFromResponse;

  test.beforeAll('Prepare data', async ({ signInApiService, productApiService }) => {
    await signInApiService.signInAsAdmin();
    [p1, p2, p3, p4, p5] = await productApiService.populateProducts(5);
  });

  test.afterAll('Clear data after test', async ({ productApiService }) => {
    await productApiService.delete();
  });

  for (const key of Object.values(ESortProductsFields)) {
    for (const order of Object.values(ESortOrder)) {
      test(
        `Should get products sorted by "${key}" in "${order}" order`,
        { tag: [TAGS.REGRESSION] },
        async function ({ productApiService }) {
          const products = await productApiService.getProductsWithSortFieldAndOrder({
            sortField: key,
            sortOrder: order
          });
          const sortedResponse = genericSort(products, key, order);
          const isSorted = sortedResponse.every(
            (p, i) => p[key as keyof IProductFromResponse] === products[i][key as keyof IProductFromResponse]
          );

          expect(isSorted, `Sorted products should match the expected order for field "${key}"`).toBe(true);
        }
      );
    }
  }

  for (const key of Object.values(ESortProductsFields).slice(0, -1)) {
    test(
      `Should get product searched with "${key}"`,
      { tag: [TAGS.REGRESSION] },
      async function ({ productApiService }) {
        const productFromServer = await productApiService.getProductsWithSearch(`${p3[key]}`);
        expect(
          productFromServer.some((p) => p[key] === p3[key]),
          `Should contain a product with value "${p3[key]}"`
        ).toBe(true);
      }
    );
  }

  test(`Should get product matching partial name search`, async ({ productApiService }) => {
    const filteredProducts = await productApiService.getProductsWithSearch(p3.name.slice(3, p3.name.length - 2));
    expect(
      filteredProducts.every((prod) => prod.name === p3.name),
      `Should contain product in the list with name '${p3.name}'`
    ).toBe(true);
  });

  test(`Should get products filtred by single manufacturer`, async ({ productApiService }) => {
    const filteredProducts = await productApiService.getProductsWithManufacturer(p1.manufacturer);
    expect(
      filteredProducts.every((prod) => prod.manufacturer === p1.manufacturer),
      `Should contain products in the list with manufacturer '${p1.manufacturer}'`
    ).toBe(true);
  });

  test(`Should get products filtred by multiple manufacturer`, async ({ productApiService }) => {
    const manufacturers = [p5.manufacturer, p2.manufacturer];
    const filteredProducts = await productApiService.getProductsWithManufacturer(manufacturers);

    expect(filteredProducts.length, 'Should return not empty list of products').toBeGreaterThan(0);
    expect(
      filteredProducts.every((prod) => manufacturers.includes(prod.manufacturer)),
      'Should contain products in the list'
    ).toBe(true);
  });

  test(`Should get products filtred by manufacturer and search`, async ({ productApiService }) => {
    const filteredProducts = await productApiService.getAll({ search: p4.name, manufacturer: p4.manufacturer });

    expect(filteredProducts.length, 'Should return not empty list of products').toBe(1);
    expect(
      filteredProducts.every((prod) => prod.manufacturer === p4.manufacturer && prod.name === p4.name),
      'Product should contain specified manufacturer and name'
    ).toBe(true);
  });

  test(`Should get empty list with fake search value`, async ({ productApiService }) => {
    const filteredProducts = await productApiService.getProductsWithSearch(faker.database.mongodbObjectId());
    expect(filteredProducts.length, 'Should return empty list of products').toBe(0);
  });

  test('Should get empty list of products with invalid value in manufacturer field', async ({ productApiService }) => {
    const products = await productApiService.getProductsWithManufacturer('test');
    expect(products.length, 'Should get empty list').toBe(0);
  });
});
