export const apiConfig = {
  baseUrl: 'https://aqa-course-project.app/',
  endpoints: {
    ['Login']: `api/login/`,
    ['Customers']: `/api/customers`,
    ['Customer By Id']: (id: string) => `api/customers/${id}/`,
    ['Products']: `api/products/`,
    ['Get Product By Id']: (id: string) => `api/products/${id}/`,
    ['Orders']: `api/orders/`,
    ['Get Order By Id']: (id: string) => `api/orders/${id}/`,
    ['Order Delivery']: (id: string) => `api/orders/${id}/delivery/`,
    ['Order Received']: (id: string) => `api/orders/${id}/receive/`,
    ['Order Status']: (id: string) => `api/orders/${id}/status`,
    ['Order Comments']: (id: string) => `api/orders/${id}/comments`,
    ['Metrics']: `/api/metrics`
  }
};
