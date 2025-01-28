import { STATUS_CODES } from '../../../data/api/statusCodes';
import { generateProductData } from '../../../data/products/generateProduct';
import { test, expect } from '../../../fixtures/apiServices.fixture';

test.describe('[API] [Products] Create', async function () {
  let id = '';

  test.beforeAll(async function ({ signInApiService }) {
    await signInApiService.signInAsAdmin();
  });

  test.afterEach(async function ({ signInApiService, productsController }) {
    const response = await productsController.delete(id, signInApiService.getToken());
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });

  test('Should create product with smoke data', async function ({
    signInApiService,
    productsController,
    productApiService
  }) {
    const productData = generateProductData();
    const createdProduct = await productApiService.create(signInApiService.getToken(), productData);
    id = createdProduct._id;
    const getProduct = (await productsController.get(id, signInApiService.getToken())).body.Product;
    expect(createdProduct).toMatchObject({ ...getProduct });
  });
});
