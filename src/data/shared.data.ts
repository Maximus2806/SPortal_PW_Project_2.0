import { generateNewCustomer } from './customers/generateCustomer';
import { generateProductData } from './products/generateProduct';

export const routesProducts = [
  { route: 'get', requiresId: true },
  { route: 'getAll', requiresId: false, body: {} },
  { route: 'create', requiresId: false, body: generateProductData() },
  { route: 'delete', requiresId: true },
  { route: 'update', requiresId: true, body: generateProductData() }
];

export const routesCustomers = [
  { route: 'get', requiresId: true },
  { route: 'getAll', requiresId: false, body: {} },
  { route: 'create', requiresId: false, body: generateNewCustomer() },
  { route: 'delete', requiresId: true },
  { route: 'update', requiresId: true, body: generateNewCustomer() }
];

export const testRoutesAuth = [
  { name: 'empty token', token: '', errorMessage: 'Not authorized' },
  {
    name: 'expired token',
    errorMessage: 'Access token expired',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTA0OTkzYWFlNDQwMTg0YWY2NDc3YiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTczODQyOTM1MiwiZXhwIjoxNzM4NTE1NzUyfQ.SZYTOwqpb51CtlznhFe66_YX9H6KARX9VBkQWW3eIv4'
  }
];
