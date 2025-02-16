export enum ESortCustomersFields {
  NAME = 'name',
  PRICE = 'price',
  MANUFACTURER = 'manufacturer',
  CREATED_ON = 'createdOn'
}

export type TSortCustomersFields = `${ESortCustomersFields}`;

export type TCustomerTableFields = 'Email' | 'Name' | 'Country' | 'Created On';
