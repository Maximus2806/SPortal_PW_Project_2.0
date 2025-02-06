import { test } from '../../../fixtures/services.fixture';

test('', async ({ signInPageService, productsPageService, homePageService }) => {
  await signInPageService.openSalesPortal();
  await signInPageService.loginAsAdmin();

  await homePageService.openProductsPage();
  await productsPageService.vefiryPageActiveInSidebar();
});
