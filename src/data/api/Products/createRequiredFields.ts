import { MANUFACTURERS } from '../../types/product.types';
import { STATUS_CODES } from '../statusCodes';

export const createProductRequiredFields = [
  {
    description: 'Sould not create product without name field',
    params: {
      manufacturer: MANUFACTURERS.SONY,
      price: 999,
      amount: 10,
      notes: 'Test note'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Name with invalid characters (special symbols)',
    params: {
      name: 'iPhone!!!',
      manufacturer: MANUFACTURERS.APPLE,
      price: 999,
      amount: 10,
      notes: ''
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Invalid manufacturer (not in the allowed list)',
    params: {
      name: 'Windows 9',
      manufacturer: 'Huawei',
      price: 999,
      amount: 10,
      notes: 'Not valid manufacturer'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Price is too large',
    params: {
      name: 'Windows 9',
      manufacturer: MANUFACTURERS.MICROSOFT,
      price: 100000,
      amount: 100,
      notes: 'Price is too large'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Amount is too large',
    params: {
      name: 'XMobil 1',
      manufacturer: MANUFACTURERS.TESLA,
      price: 99999,
      amount: 1000,
      notes: 'Amount is too large'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  }
];
