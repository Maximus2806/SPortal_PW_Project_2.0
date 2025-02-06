import { ESortOrder } from '../api.types';
import { MANUFACTURERS } from './product.types';

export enum ESortProductsFields {
  NAME = 'name',
  PRICE = 'price',
  MANUFACTURER = 'manufacturer',
  CREATED_ON = 'createdOn'
}

export type TSortProductsFields = `${ESortProductsFields}`;

export interface IGetAllProducsParams {
  manufacturer?: string | MANUFACTURERS | (MANUFACTURERS | string)[];
  search?: string | string[];
  sortField?: string | ESortProductsFields;
  sortOrder?: string | ESortOrder;
}
