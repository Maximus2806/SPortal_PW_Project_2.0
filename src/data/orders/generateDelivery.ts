import { faker } from '@faker-js/faker';
import { COUNTRIES } from '../customers/countries';
import { getRandomEnumValue } from '../../utils/enums/getRandomEnumValue';
import { IOrderDelivery } from '../types/orders/orders.types';
import { getFinalDate } from '../../utils/date/dateAhead';

const generateDaysAhead = (): number => {
  return Math.floor(Math.random() * (10 - 3 + 1)) + 3;
};

export const generateDelivery = (params?: Partial<IOrderDelivery>) => {
  return {
    finalDate: getFinalDate(generateDaysAhead()),
    address: {
      country: getRandomEnumValue(COUNTRIES),
      city: `City ${faker.string.alpha(15)}`,
      street: `Street ${faker.string.alphanumeric(33)}`,
      house: faker.number.int(999),
      flat: faker.number.int(9999)
    },
    condition: getRandomEnumValue(['Delivery', 'Pickup']),
    ...params
  } as IOrderDelivery;
};
