import { STATUS_CODES } from '../statusCodes';

export const createBodyData = [
  //Boundary tests
  {
    description: 'Should create customer with minimal valid name length',
    params: { name: 'A' },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Should create customer with maximal valid name length',
    params: { name: 'A'.repeat(40) },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Should create customer with minimal valid city length',
    params: { city: 'B' },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Should create customer with maximal valid city length',
    params: { city: 'C'.repeat(20) },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Should create customer with minimal valid street length',
    params: { street: 'D' },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Should create customer with maximal valid street length',
    params: { street: 'E'.repeat(40) },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Should create customer with minimal valid house number',
    params: { house: 1 },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Should create customer with maximal valid house number',
    params: { house: 999 },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Should create customer with minimal valid flat number',
    params: { flat: 1 },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Should create customer with maximal valid flat number',
    params: { flat: 9999 },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Should create customer with minimal valid phone number length',
    params: { phone: '+1'.padEnd(11, '0') },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Should create customer with maximal valid phone number length',
    params: { phone: '+1'.padEnd(21, '0') },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Should create customer with minimal valid notes length',
    params: { notes: '' },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null
  },
  {
    description: 'Should create customer with maximal valid notes length',
    params: { notes: 'A'.repeat(250) },
    expectedStatus: STATUS_CODES.CREATED,
    isSuccess: true,
    errorMessage: null
  },
  //Negative tests
  {
    description: 'Should not create customer with Email with invalid characters (special symbols)',
    params: {
      email: 'inv[alid.email@com'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Email starting with a dot',
    params: { email: '.invalidemail@example.com' },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Email ending with a dot',
    params: { email: 'invalidemail.@example.com' },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Email containing consecutive dots',
    params: { email: 'invalid..email@example.com' },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Email missing "@" symbol',
    params: { email: 'invalidemail.com' },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Email missing domain part',
    params: { email: 'invalidemail@' },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Email with invalid domain characters',
    params: { email: 'validname@dom$ain.com' },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Email missing domain zone',
    params: { email: 'validname@domain' },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Email containing one-letter domain zone',
    params: { email: 'validname@domain.a' },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Email containing non-Latin characters',
    params: { email: 'имя@почта.com' },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Name with invalid characters (special symbols)',
    params: {
      name: 'John! Doe'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Name longer than 40 characters',
    params: {
      name: 'swijloatmetxnalxkgvbetgreeqfgcgcwywhmuxek'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Name with repeating spaces',
    params: {
      name: 'swijl   fgcgcw'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with empty Name',
    params: {
      name: ''
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with City with invalid characters (numbers in city name)',
    params: {
      city: 'Moscow1'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with City with name longer than 20 characters',
    params: {
      city: 'fqlehlkwzuwhzzofrbcgd'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with empty City',
    params: {
      city: ''
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with City with cirillic name',
    params: {
      city: 'Макс'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Phone with invalid length shorter than 10 characters',
    params: {
      phone: '+1234'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Phone with length longer than 20 characters',
    params: {
      phone: '+123456789012345678901'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Phone with characters except numbers and "+" sign',
    params: {
      phone: '+123342432d43A01'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Phone without "+" sign',
    params: {
      phone: '1234567890'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Invalid country (not in the allowed list)',
    params: {
      country: 'Bangladesh'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with House number greater than 999',
    params: {
      house: 1000
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with House number smaller than 1',
    params: {
      house: 0
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with House value which is not a number',
    params: {
      house: [true]
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Street name with invalid spacing',
    params: {
      street: 'Street with   multiple spaces'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Empty street name',
    params: {
      street: ''
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Street name longer than 40 characters',
    params: {
      street: 'Steet name longer than 40 characters 1234'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Flat number greater than 9999',
    params: {
      flat: 10000
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Flat number smaller than 1',
    params: {
      flat: 0
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Notes with more than 250 characters',
    params: {
      notes:
        'mvmvmyjsgaqninygjfcsmmodbkmnpvhjztvutovsnuhbhtcqxqaremgofvztenoqyvqtikdyzncctvpzphntnntarjckzemrxfmxuaejibfprwwmlklubzejkoojohpjjwccfjajyqwpllaaynschhjbmhxubtxvorvpjddxxcukboxjgtdxlewxodqszesmrzpmlfnkfkuduynuekmxoddzubbegxyymtbyxupjhgchnrvurnnslabtqqj'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  },
  {
    description: 'Should not create customer with Notes with invalid characters <>',
    params: {
      notes: 'rvurnns<>labtqqj'
    },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    isSuccess: false,
    errorMessage: 'Incorrect request body'
  }
];
