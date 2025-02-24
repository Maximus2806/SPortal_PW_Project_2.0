import { TAGS } from '../../tags';
import { STATUS_CODES } from '../statusCodes';
import { getFinalDate } from '../../../utils/date/dateAhead';

export const orderDeliveryData = [
  //  Positive tests
  {
    description: 'Should update delivery data with valid parameters',
    params: {
      finalDate: getFinalDate(5),
      address: {
        country: 'Germany',
        city: 'Berlin',
        street: 'Main Street 123',
        house: 123,
        flat: 5678
      },
      condition: 'Delivery'
    },
    expectedStatus: STATUS_CODES.OK,
    isSuccess: true,
    errorMessage: null,
    tags: [TAGS.REGRESSION, TAGS.SMOKE]
  },
  {
    description: 'Should allow minimal valid values for fields',
    params: {
      finalDate: getFinalDate(3),
      address: {
        country: 'USA',
        city: 'A',
        street: 'S1',
        house: 100,
        flat: 1000
      },
      condition: 'Pickup'
    },
    expectedStatus: STATUS_CODES.OK,
    isSuccess: true,
    errorMessage: null,
    tags: [TAGS.REGRESSION]
  },
  {
    description: 'Should allow maximum valid values for fields',
    params: {
      finalDate: getFinalDate(10),
      address: {
        country: 'Canada',
        city: 'ABCDEFGHIJKLMNOPQRST',
        street: 'Very Long Street Name 123456789012345678',
        house: 999,
        flat: 9999
      },
      condition: 'Delivery'
    },
    expectedStatus: STATUS_CODES.OK,
    isSuccess: true,
    errorMessage: null,
    tags: [TAGS.REGRESSION]
  },

  //  Negative tests
  {
    description: 'Should return error for missing required field: condition',
    params: {
      finalDate: getFinalDate(5),
      address: {
        country: 'Germany',
        city: 'Berlin',
        street: 'Main Street 123',
        house: 123,
        flat: 5678
      }
      // condition missing
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION]
  },
  {
    description: 'Should return error for invalid condition value',
    params: {
      finalDate: getFinalDate(5),
      address: {
        country: 'Germany',
        city: 'Berlin',
        street: 'Main Street 123',
        house: 123,
        flat: 5678
      },
      condition: 'Shipping' // Invalid value
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION]
  },
  {
    description: 'Should return error for finalDate less than 3 days from today',
    params: {
      finalDate: getFinalDate(2), // Date before 3 days
      address: {
        country: 'Germany',
        city: 'Berlin',
        street: 'Main Street 123',
        house: 123,
        flat: 5678
      },
      condition: 'Delivery'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION]
  },
  {
    description: 'Should return error for finalDate greater than 10 days from today',
    params: {
      finalDate: getFinalDate(11), // Date later than 10 days (> +10)
      address: {
        country: 'Germany',
        city: 'Berlin',
        street: 'Main Street 123',
        house: 123,
        flat: 5678
      },
      condition: 'Delivery'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Invalid finalDate',
    tags: [TAGS.REGRESSION]
  },
  {
    description: 'Should return error for invalid country value',
    params: {
      finalDate: getFinalDate(4),
      address: {
        country: 'Spain', // Invalid value
        city: 'Barcelona',
        street: 'Ramblas 123',
        house: 200,
        flat: 6789
      },
      condition: 'Delivery'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION]
  },
  {
    description: 'Should return error for invalid city format',
    params: {
      finalDate: getFinalDate(6),
      address: {
        country: 'Germany',
        city: 'City123!@#', // Not acceptable characters
        street: 'Main Street 123',
        house: 123,
        flat: 5678
      },
      condition: 'Delivery'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION]
  },
  {
    description: 'Should return error for too long city name',
    params: {
      finalDate: getFinalDate(7),
      address: {
        country: 'Germany',
        city: 'ABCDEFGHIJKLMNOPQRSTU', // Longer than 20
        street: 'Main Street 123',
        house: 123,
        flat: 5678
      },
      condition: 'Delivery'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION]
  },
  {
    description: 'Should return error for house number out of range',
    params: {
      finalDate: getFinalDate(8),
      address: {
        country: 'Germany',
        city: 'Berlin',
        street: 'Main Street 123',
        house: 1000, // Greater than 999
        flat: 5678
      },
      condition: 'Delivery'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION]
  },
  {
    description: 'Should return error for invalid flat number',
    params: {
      finalDate: getFinalDate(9),
      address: {
        country: 'Germany',
        city: 'Berlin',
        street: 'Main Street 123',
        house: 123,
        flat: 10000 // Greater than 9999
      },
      condition: 'Delivery'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION]
  },
  {
    description: 'Should return error for missing required field: street',
    params: {
      finalDate: getFinalDate(4),
      address: {
        country: 'Germany',
        city: 'Berlin',
        house: 123,
        flat: 5678
      },
      condition: 'Delivery'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body',
    tags: [TAGS.REGRESSION]
  }
];
