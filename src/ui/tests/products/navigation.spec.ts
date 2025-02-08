import { TAGS } from '../../../data/tags';
import { test } from '../../../fixtures/services.fixture';

test(
  'Sidebar button should be active after opening products list page',
  { tag: [TAGS.REGRESSION] },
  async ({ signInPageService, productsPageService, homePageService }) => {
    await signInPageService.openSalesPortal();

    await homePageService.openProductsPage();
    await productsPageService.vefiryPageActiveInSidebar();
  }
);
