import { test as setup } from '../../../fixtures/services.fixture';

const authFile = 'src/.auth/user.json';

setup('Login to Sales Portal', async ({ page, signInPageService }) => {
  await signInPageService.openSalesPortal();
  await signInPageService.loginAsAdmin();
  await page.context().storageState({ path: authFile });
});
