import { IResponseFields } from '../api.types';
import { ICustomerFromResponse } from '../customers/customers.types';
import { IProductFromResponse } from '../products/product.types';

export type TOrderStatus = 'Draft' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface IOrderRequest {
  customer: string;
  products: string[];
}

export interface IOrder {
  _id: string;
  status: TOrderStatus;
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

export interface IOrdersResponse extends IResponseFields {
  Orders: IOrder[];
}

export interface IOrderNumberDetails {
  orderNumber: string;
  assignedManager: string;
}

export interface IOrderStatusDetails {
  orderStatus: string;
  totalPrice: string;
  delivery: string;
  createdOn: string;
}

export interface IOrderDetails extends IOrderNumberDetails, IOrderStatusDetails {}

export interface ICustomerDetails {
  email: string;
  name: string;
  country: string;
  city: string;
  street: string;
  house: string;
  flat: string;
  phone: string;
  createdOn: string;
  notes?: string;
}

export interface IRequestedProductDetails {
  name: string;
  price: string;
  manufacturer: string;
  notes?: string;
}
