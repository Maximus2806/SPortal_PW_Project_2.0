import { MANUFACTURERS } from '../types/product.types';
import { baseSchemaPart } from './base.schema';

export const productResponseSchema = {
  type: 'object',
  properties: {
    Product: {
      type: 'object',
      properties: {
        _id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        amount: {
          type: 'number'
        },
        price: {
          type: 'number'
        },
        manufacturer: {
          type: 'string',
          enum: Object.values(MANUFACTURERS)
        },
        createdOn: {
          type: 'string'
          // format: "date-time",
        },
        notes: {
          type: 'string'
        }
      },
      required: ['_id', 'name', 'amount', 'price', 'manufacturer', 'createdOn'],
      additionalProperties: false
    },
    ...baseSchemaPart
  }
};
