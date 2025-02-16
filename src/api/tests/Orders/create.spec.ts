import _ from 'lodash';
import { IOrder } from '../../../data/types/orders/orders.types';
import { test, expect } from '../../../fixtures/apiServices.fixture';
import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation';

test.describe('[API] [Orders] Create order', async function () {
  test.beforeEach(async function ({ signInApiService }) {
    await signInApiService.signInAsAdmin();
  });
});
