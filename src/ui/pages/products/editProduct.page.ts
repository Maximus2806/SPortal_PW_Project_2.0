import { AddEditProductPage } from './addEditProduct.page';

export class EditProductPage extends AddEditProductPage {
  readonly ['Save Product button'] = '#save-product-changes';
  readonly uniqueElement: string = '//h2[contains(text(), "Edit")]';

}