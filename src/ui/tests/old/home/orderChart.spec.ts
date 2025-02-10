import { apiConfig } from '../../../../config/apiConfig';
import { homeChartMock } from '../../../../data/mock/homeTask2.mock';
import { STATUS_CODES } from '../../../../data/api/statusCodes';
import { test } from '../../../../fixtures/services.fixture';

test.describe(`[UI] [Home] Order chart layout`, async function () {
  test('Should check layout of Order chart', async function ({ signInPageService, mock, homePageService }) {
    const mockData = structuredClone(homeChartMock);
    await mock.modifyReponse(apiConfig.baseUrl + apiConfig.endpoints.Metrics, mockData, STATUS_CODES.OK);
    await signInPageService.openSalesPortal();
    await homePageService.checkOrderChartLayout();
  });
});
