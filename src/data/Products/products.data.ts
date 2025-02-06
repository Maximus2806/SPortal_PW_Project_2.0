export const productToastMessages = {
  created: `Product was successfully created`,
  updated: `Product was successfully updated`,
  deleted: `Product was successfully deleted`,
  'assigned to order': `Not allowed to delete product, assigned to the order`,
  'already exist': (name?: string) => `Product with name '${name}' already exists`,
};
