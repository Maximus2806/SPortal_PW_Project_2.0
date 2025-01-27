import { test, expect } from '../../../fixtures/apiServices.fixture';
import { COUNTRIES } from '../../../data/customers/countries';
import { validateResponse } from '../../../utils/validation/apiValidation';
import { STATUS_CODES } from '../../../data/api/statusCodes';

test.describe('[API] [Customers] [Get all customers]', async function () {
  test.beforeAll(async function ({ signInApiService }) {
    await signInApiService.signInAsAdmin();
  });
  test('Should get all customers with valid query parameters', async function ({
    signInApiService,
    customersController
  }) {
    const queryParams = {
      country: [COUNTRIES.USA, COUNTRIES.BELARUS],
      sortField: 'name',
      sortOrder: 'desc'
    };
    const allCustomersResponse = await customersController.getAll(signInApiService.getToken(), queryParams);
    validateResponse(allCustomersResponse, STATUS_CODES.OK, true, null);
    expect(allCustomersResponse.body.Customers.length).toBeGreaterThan(0);
  });
});
