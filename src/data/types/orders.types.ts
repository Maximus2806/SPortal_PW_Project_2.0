import { IResponseFields } from './api.types';
import { ICustomerFromResponse } from './customers.types';
import { IProductFromResponse } from './product.types';

type Status = 'Draft' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface IOrderRequest {
  customer: string;
  products: string[];
}

export interface IOrder {
  _id: string;
  status: Status;
  customer: ICustomerFromResponse;
  products: IProductOrder[];
  total_price: number;
  createdOn: string;
  delivery: IDelivery | null;
  comments: string[];
  history: IOrderHistory[];
}

export interface IDelivery {
  method: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface IOrderHistory {
  status: string;
  customer: string;
  products: IProductFromResponse[];
  total_price: number;
  delivery: IDelivery | null;
  changedOn: string;
  action: string;
}

export interface IProductOrder extends IProductFromResponse {
  received: boolean;
}

export interface IOrderResponse extends IResponseFields {
  Order: IOrder;
}
