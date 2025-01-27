import { IProduct, MANUFACTURERS } from '../types/product.types';
import { faker } from '@faker-js/faker';
import { getRandomEnumValue } from '../../utils/enums/getRandomEnumValue';

export function generateProductData(customData?: Partial<IProduct>): IProduct {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    manufacturer: getRandomEnumValue(MANUFACTURERS),
    amount: faker.number.int({ min: 0, max: 999 }),
    price: faker.number.int({ min: 1, max: 99999 }),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...customData
  };
}
