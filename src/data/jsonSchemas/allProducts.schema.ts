import { MANUFACTURERS } from '../types/product.types';
import { baseSchemaPart } from './base.schema';

export const allProductsSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    Products: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            pattern: '^[a-fA-F0-9]{24}$'
          },
          name: {
            type: 'string',
            minLength: 1
          },
          amount: {
            type: 'integer',
            minimum: 0
          },
          price: {
            type: 'integer',
            minimum: 0
          },
          manufacturer: {
            type: 'string',
            enum: Object.values(MANUFACTURERS)
          },
          createdOn: {
            type: 'string'
          },
          notes: {
            type: 'string'
          }
        },
        required: ['_id', 'name', 'amount', 'price', 'manufacturer', 'createdOn'],
        additionalProperties: false
      }
    },
    ...baseSchemaPart
  }
};
