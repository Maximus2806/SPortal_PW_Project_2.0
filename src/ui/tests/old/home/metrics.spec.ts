import { apiConfig } from '../../../config/apiConfig';
import { homePageMock } from '../../../data/mock/home.mock';
import { STATUS_CODES } from '../../../data/api/statusCodes';
import { test } from '../../../fixtures/services.fixture';

test.describe(`[UI] [Home] Metrics`, async function () {
  test('Should see Orders This Year metric with 10', async function ({ signInPageService, mock, homePageService }) {
    const mockData = structuredClone(homePageMock);
    mockData.Metrics.orders.totalOrders = 10;
    await mock.modifyReponse(apiConfig.baseUrl + apiConfig.endpoints.Metrics, mockData, STATUS_CODES.OK);
    await signInPageService.openSalesPortal();
    await homePageService.validateMetric('Total Orders', mockData.Metrics.orders.totalOrders);
  });

  test('Should see Total Revenue metric with 100000000', async function ({ signInPageService, mock, homePageService }) {
    const mockData = structuredClone(homePageMock);
    mockData.Metrics.orders.totalRevenue = 100000000;
    await mock.modifyReponse(apiConfig.baseUrl + apiConfig.endpoints.Metrics, mockData, STATUS_CODES.OK);
    await signInPageService.openSalesPortal();
    await homePageService.validateMetric('Total Revenue', mockData.Metrics.orders.totalRevenue);
  });

  test('Should see Avg Order Value metric with 10000', async function ({ signInPageService, mock, homePageService }) {
    const mockData = structuredClone(homePageMock);
    mockData.Metrics.orders.averageOrderValue = 10000;
    await mock.modifyReponse(apiConfig.baseUrl + apiConfig.endpoints.Metrics, mockData, STATUS_CODES.OK);
    await signInPageService.openSalesPortal();
    await homePageService.validateMetric('Avg Order Value', mockData.Metrics.orders.averageOrderValue);
  });

  test('Should see New Customers metric with 100', async function ({ signInPageService, mock, homePageService }) {
    const mockData = structuredClone(homePageMock);
    mockData.Metrics.customers.totalNewCustomers = 100;
    await mock.modifyReponse(apiConfig.baseUrl + apiConfig.endpoints.Metrics, mockData, STATUS_CODES.OK);
    await signInPageService.openSalesPortal();
    await homePageService.validateMetric('New Customers', mockData.Metrics.customers.totalNewCustomers);
  });

  test('Should see Canceled Orders metric with 5', async function ({ signInPageService, mock, homePageService }) {
    const mockData = structuredClone(homePageMock);
    mockData.Metrics.orders.totalCanceledOrders = 5;
    await mock.modifyReponse(apiConfig.baseUrl + apiConfig.endpoints.Metrics, mockData, STATUS_CODES.OK);
    await signInPageService.openSalesPortal();
    await homePageService.validateMetric('Canceled Orders', mockData.Metrics.orders.totalCanceledOrders);
  });
});
