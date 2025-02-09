import { apiConfig } from '../../../../config/apiConfig';
import { homePageMock } from '../../../../data/mock/home.mock';
import { STATUS_CODES } from '../../../../data/api/statusCodes';
import { test } from '../../../../fixtures/services.fixture';

test.describe(`[UI] [Home] Metrics layout`, async function () {
  test('Should check layout of Orders This Year metric', async function ({ signInPageService, mock, homePageService }) {
    const mockData = structuredClone(homePageMock);
    mockData.Metrics.orders.totalOrders = 10;
    await mock.modifyReponse(apiConfig.baseUrl + apiConfig.endpoints.Metrics, mockData, STATUS_CODES.OK);
    await signInPageService.openSalesPortal();
    await homePageService.checkMetricLayout('Total Orders');
  });

  test('Should check layout of Total Revenue metric', async function ({ signInPageService, mock, homePageService }) {
    const mockData = structuredClone(homePageMock);
    mockData.Metrics.orders.totalRevenue = 100000000;
    await mock.modifyReponse(apiConfig.baseUrl + apiConfig.endpoints.Metrics, mockData, STATUS_CODES.OK);
    await signInPageService.openSalesPortal();
    await homePageService.checkMetricLayout('Total Revenue');
  });

  test('Should check layout of Avg Order Value metric', async function ({ signInPageService, mock, homePageService }) {
    const mockData = structuredClone(homePageMock);
    mockData.Metrics.orders.averageOrderValue = 10000;
    await mock.modifyReponse(apiConfig.baseUrl + apiConfig.endpoints.Metrics, mockData, STATUS_CODES.OK);
    await signInPageService.openSalesPortal();
    await homePageService.checkMetricLayout('Avg Order Value');
  });

  test('Should check layout of New Customers metric', async function ({ signInPageService, mock, homePageService }) {
    const mockData = structuredClone(homePageMock);
    mockData.Metrics.customers.totalNewCustomers = 100;
    await mock.modifyReponse(apiConfig.baseUrl + apiConfig.endpoints.Metrics, mockData, STATUS_CODES.OK);
    await signInPageService.openSalesPortal();
    await homePageService.checkMetricLayout('New Customers');
  });

  test('Should check layout of Canceled Orders metric', async function ({ signInPageService, mock, homePageService }) {
    const mockData = structuredClone(homePageMock);
    mockData.Metrics.orders.totalCanceledOrders = 5;
    await mock.modifyReponse(apiConfig.baseUrl + apiConfig.endpoints.Metrics, mockData, STATUS_CODES.OK);
    await signInPageService.openSalesPortal();
    await homePageService.checkMetricLayout('Canceled Orders');
  });
});
