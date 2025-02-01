import { COUNTRIES } from '../../customers/countries';
import { STATUS_CODES } from '../statusCodes';

export const createCustomerReqiredFields = [
  {
    description: 'Sould not create customer without Email field',
    params: {
      name: 'Alice Smith',
      country: COUNTRIES.UKRAINE,
      city: 'Toronto',
      street: 'Queen St',
      house: 321,
      flat: 99,
      phone: '+15559998888',
      notes: 'Test note'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Name with invalid characters (special symbols)',
    params: {
      email: 'john.doe@example.com',
      name: 'John! Doe',
      country: COUNTRIES.BELARUS,
      city: 'Berlin',
      street: 'Main Str',
      house: 56,
      flat: 7,
      phone: '+49123456789',
      notes: ''
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'City with invalid characters (numbers in city name)',
    params: {
      email: 'mike.jones@example.com',
      name: 'Mike Jones',
      country: COUNTRIES.USA,
      city: 'Moscow1',
      street: 'Lenin St',
      house: 12,
      flat: 3,
      phone: '+74951234567',
      notes: 'Some note'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Phone with invalid length (too short)',
    params: {
      email: 'test@example.com',
      name: 'Sarah Lee',
      country: COUNTRIES.GERMANY,
      city: 'Kiev',
      street: 'Shevchenko Blvd',
      house: 45,
      flat: 22,
      phone: '+1234',
      notes: 'Invalid phone number'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Invalid country (not in the allowed list)',
    params: {
      email: 'invalid.customer@example.com',
      name: 'Anna Lee',
      country: COUNTRIES.FRANCE,
      city: 'Osaka',
      street: 'Nishi St.',
      house: 202,
      flat: 18,
      phone: '+819012345678',
      notes: 'Not valid country'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Street name with invalid spacing',
    params: {
      email: 'john.doe2@example.com',
      name: 'John Doe',
      country: COUNTRIES.FRANCE,
      city: 'Los Angeles',
      street: 'Street with   multiple spaces',
      house: 999,
      flat: 101,
      phone: '+155512345678',
      notes: 'Incorrect street format'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Flat number too large',
    params: {
      email: 'jack.smith@example.com',
      name: 'Jack Smith',
      country: COUNTRIES.GREAT_BRITAIN,
      city: 'Hamburg',
      street: 'Kaiser Str.',
      house: 222,
      flat: 10000,
      phone: '+494011223344',
      notes: 'Flat number too large'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  }
];
