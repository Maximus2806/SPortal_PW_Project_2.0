import { generateProductData } from '../../../data/products/generateProduct';
import { test, expect } from '../../../fixtures/apiServices.fixture';
test.describe('[API] [Products] Create', async function () {
  test.afterEach(async function ({ productApiService }) {
    await productApiService.delete();
  });

  test('Should create product with smoke data', async function ({ productApiService }) {
    const productData = generateProductData();
    const createdProduct = await productApiService.create(productData);
    const id = createdProduct._id;
    const receivedProduct = await productApiService.getById(id);
    expect(createdProduct).toMatchObject({ ...receivedProduct });
  });
});
