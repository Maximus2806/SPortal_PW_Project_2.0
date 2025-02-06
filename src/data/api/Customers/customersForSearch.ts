import { faker } from '@faker-js/faker';
import { COUNTRIES } from '../../customers/countries';

export const testCustomers = [
  {
    name: faker.string.alpha(10) + 'Canada', // Coincidence by name
    email: `random${Date.now()}@example.com`,
    country: COUNTRIES.USA
  },
  {
    name: faker.string.alpha(10) + faker.string.alpha(10),
    email: `canada${Date.now()}@example.com`, // Coincidence by email
    country: COUNTRIES.BELARUS
  },
  {
    name: 'Michael Brown',
    email: `michael${Date.now()}@example.com`,
    country: COUNTRIES.CANADA // Coincidence by country
  },
  {
    name: 'caNaDa' + faker.string.alpha(10), // Case insensitive check
    email: `user${Date.now()}@test.com`,
    country: COUNTRIES.GERMANY
  }
];
