import { IProduct } from '../../../data/types/products/product.types';
import { AddEditProductPage } from './addEditProduct.page';

export class AddNewProductPage extends AddEditProductPage {
  readonly uniqueElement = '//h2[.="Add New Product "]';
  readonly 'Save Product button' = this.findElement('#save-new-product');
  readonly 'Page body' = this.findElement('//div[@id="root"]/div');

}
