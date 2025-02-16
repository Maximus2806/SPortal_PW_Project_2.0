import { COUNTRIES } from '../customers/countries';
import { TOrderStatus } from './orders/orders.types';
import { MANUFACTURERS } from './products/product.types';

export type UnionFilterModalLabels = MANUFACTURERS | TOrderStatus | COUNTRIES;
