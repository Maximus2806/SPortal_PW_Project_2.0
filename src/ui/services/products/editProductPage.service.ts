import { generateProductData } from '../../../data/products/generateProduct';
import { IProduct } from '../../../data/types/products/product.types';
import { logStep } from '../../../utils/reporter/logStep';
import { EditProductPage } from '../../pages/products/editProduct.page';
import { ProductsListPage } from '../../pages/products/products.page';
import { SalesPortalPageService } from '../salesPortal.service';

export class EditProductPageService extends SalesPortalPageService {
  private editProductPage = new EditProductPage(this.page);
  private productsPage = new ProductsListPage(this.page);

  @logStep('Update prodcut via UI')
  async update(customProduct?: Partial<IProduct>) {
    const updatedProduct = generateProductData(customProduct);
    await this.editProductPage.fillInputs(updatedProduct);
    await this.editProductPage.clickOnSaveButton();
    await this.productsPage.waitForOpened();
    return updatedProduct;
  }
}
