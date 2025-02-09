import { apiConfig } from '../../../../config/apiConfig';
import { customersPageMock } from '../../../../data/mock/customers.mock';
import { STATUS_CODES } from '../../../../data/api/statusCodes';
import { test } from '../../../../fixtures/services.fixture';

test.describe(`[UI] [Home] Customers`, async function () {
  test('Should see empty table text', async function ({
    signInPageService,
    mock,
    homePageService,
    customersPageService
  }) {
    const mockData = structuredClone(customersPageMock);
    mockData.Customers = [];
    console.log('mockData', mockData);
    await signInPageService.openSalesPortal();
    const queryParams = '?sortField=createdOn&sortOrder=desc';
    await mock.modifyReponse(
      apiConfig.baseUrl + apiConfig.endpoints.Customers + queryParams,
      mockData,
      STATUS_CODES.OK
    );
    await homePageService.openCustomersPage();
    await customersPageService.validateEmpryTableText();
  });
});
