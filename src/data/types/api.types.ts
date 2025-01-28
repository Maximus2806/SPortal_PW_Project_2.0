import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';
import { COUNTRIES } from '../customers/countries';

export interface IRequestOptions {
  baseURL: string;
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: object;
  headers?: Record<string, string>;
}

export interface IResponse<T extends IResponseFields> {
  status: number;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  body: T;
}

export interface IResponseFields {
  IsSuccess: boolean;
  ErrorMessage: string | null;
}

export interface IGetAllParams {
  manufacturer?: string;
  search?: string;
  sortField?: string;
  sortOrder?: string;
}

export interface IGetAllCustomersParams {
  search?: string;
  country?: COUNTRIES[];
  sortField?: string;
  sortOrder?: string;
}
