export enum SORT_FIELDS {
  NAME = 'name',
  PRICE = 'price',
  MANUFACTURER = 'manufacturer',
  CREATED_ON = 'createdOn'
}

export enum SORT_ORDER {
  ASC = 'asc',
  DESC = 'desc'
}

export type TSortOrder = `${SORT_ORDER}`;

export enum CUSTOMER_SORT_FIELDS {
  EMAIL = 'email',
  NAME = 'name',
  COUNTRY = 'country',
  CREATED_ON = 'createdOn'
}
