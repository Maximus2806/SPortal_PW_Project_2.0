import { test as setup } from '../../src/fixtures/apiServices.fixture';
import { SALES_PORTAL_URL } from './environment';
const authFile = 'src/.auth/user.json';

setup('API AUTHENTICATION FOR UI', async ({ page, signInApiService }) => {
  console.log('AUTH SET UP - LAUNCHED');
  const token = await signInApiService.signInAsAdmin();
  await page.context().addCookies([
    {
      name: 'Authorization',
      value: token,
      url: SALES_PORTAL_URL
    }
  ]);
  await page.context().storageState({ path: authFile });
  console.log('AUTH SET UP - FINISHED');
});
