export const createOrderSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    Order: {
      type: 'object',
      properties: {
        _id: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' },
        status: { type: 'string', enum: ['Draft', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'] },
        customer: {
          type: 'object',
          properties: {
            _id: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' },
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            country: { type: 'string' },
            city: { type: 'string' },
            street: { type: 'string' },
            house: { type: 'integer' },
            flat: { type: 'integer' },
            phone: { type: 'string', pattern: '^\\+?[0-9]{7,15}$' },
            createdOn: { type: 'string', format: 'date-time' },
            notes: { type: 'string' }
          },
          required: ['_id', 'email', 'name', 'country', 'city', 'street', 'house', 'flat', 'phone', 'createdOn']
        },
        products: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' },
              name: { type: 'string' },
              amount: { type: 'integer' },
              price: { type: 'integer' },
              manufacturer: { type: 'string' },
              notes: { type: 'string' },
              received: { type: 'boolean' }
            },
            required: ['_id', 'name', 'amount', 'price', 'manufacturer', 'received']
          }
        },
        total_price: { type: 'integer' },
        createdOn: { type: 'string', format: 'date-time' },
        comments: { type: 'array', items: { type: 'string' } },
        history: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              status: { type: 'string' },
              customer: { type: 'string' },
              products: { type: 'array' },
              total_price: { type: 'integer' },
              delivery: { type: ['object', 'null'] },
              changedOn: { type: 'string', format: 'date-time' },
              action: { type: 'string' }
            },
            required: ['status', 'customer', 'products', 'total_price', 'changedOn', 'action']
          }
        }
      },
      required: ['_id', 'status', 'customer', 'products', 'total_price', 'createdOn', 'history']
    },
    IsSuccess: { type: 'boolean' },
    ErrorMessage: { type: ['string', 'null'] }
  },
  required: ['Order', 'IsSuccess', 'ErrorMessage']
};
