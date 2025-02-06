export const createProductSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    Product: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          maxLength: 40
        },
        manufacturer: {
          type: 'string',
          enum: ['Apple', 'Samsung', 'Google', 'Microsoft', 'Sony', 'Xiaomi', 'Amazon', 'Tesla']
        },
        price: {
          type: 'integer',
          minimum: 1,
          maximum: 99999
        },
        amount: {
          type: 'integer',
          minimum: 0,
          maximum: 999
        },
        createdOn: {
          type: 'string',
          format: 'date-time'
        },
        _id: {
          type: 'string',
          pattern: '^[a-fA-F0-9]{24}$'
        }
      },
      required: ['name', 'manufacturer', 'price', 'amount', 'createdOn', '_id']
    },
    IsSuccess: {
      type: 'boolean'
    },
    ErrorMessage: {
      type: ['string', 'null']
    }
  },
  required: ['Product', 'IsSuccess', 'ErrorMessage']
};
