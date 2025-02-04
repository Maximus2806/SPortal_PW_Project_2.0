import { STATUS_CODES } from '../statusCodes';
import { MANUFACTURERS } from '../../types/products/product.types';
import { ESortProductsFields } from '../../types/products/productSortFields';
import { ESortOrder } from '../../types/api.types';

export const testCases = [
  {
    description: 'No query parameters',
    params: {},
    expectedStatus: STATUS_CODES.OK,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Filter by manufacturer',
    params: { manufacturer: MANUFACTURERS.APPLE },
    expectedStatus: STATUS_CODES.OK,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Sort by name in ascending order',
    params: { sortField: ESortProductsFields.NAME, sortOrder: ESortOrder.ASC },
    expectedStatus: STATUS_CODES.OK,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Sort by price in descending order',
    params: { sortField: ESortProductsFields.PRICE, sortOrder: ESortOrder.DESC },
    expectedStatus: STATUS_CODES.OK,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Filter by manufacturer and sort by createdOn descending',
    params: {
      manufacturer: MANUFACTURERS.XIAOMI,
      sortField: ESortProductsFields.CREATED_ON,
      sortOrder: ESortOrder.DESC
    },
    expectedStatus: STATUS_CODES.OK,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Search with a keyword',
    params: { search: 'Tuna' },
    expectedStatus: STATUS_CODES.OK,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Search with a keyword and filter by manufacturer',
    params: { search: 'Test', manufacturer: MANUFACTURERS.APPLE },
    expectedStatus: STATUS_CODES.OK,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Invalid manufacturer',
    params: { manufacturer: 'InvalidManufacturer' },
    expectedStatus: STATUS_CODES.OK,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Invalid sortField',
    params: { sortField: 'invalidField' },
    expectedStatus: STATUS_CODES.OK,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Invalid sortOrder',
    params: { sortOrder: 'invalidField' },
    expectedStatus: STATUS_CODES.OK,
    isSuccess: true,
    errorMessage: null
  }
];
