import { faker } from '@faker-js/faker';
import { ICustomer } from '../types/customers/customers.types';
import { COUNTRIES } from './countries';
import { getRandomEnumValue } from '../../utils/enums/getRandomEnumValue';

export const generateNewCustomer = (params?: Partial<ICustomer>) => {
  return {
    email: faker.internet.email(),
    name: `Name ${faker.string.alpha(35)}`,
    country: getRandomEnumValue(COUNTRIES),
    city: `City ${faker.string.alpha(15)}`,
    street: `Street ${faker.string.alphanumeric(33)}`,
    house: faker.number.int(999),
    flat: faker.number.int(9999),
    phone: `+${faker.number.int(999999999999)}`,
    notes: `Notes ${faker.string.alpha(244)}`,
    ...params
  } as ICustomer;
};
