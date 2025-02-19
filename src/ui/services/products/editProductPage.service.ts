import { generateProductData } from '../../../data/productss/generateProduct';
import { IProduct } from '../../../data/types/products/product.types';
import { logStep } from '../../../utils/reporter/logStep';
import { DeleteModalPage } from '../../pages/modals/delete-modal.page';
import { EditProductPage } from '../../pages/products/editProduct.page';
import { ProductsListPage } from '../../pages/products/products.page';
import { SalesPortalPageService } from '../salesPortal.service';

export class EditProductPageService extends SalesPortalPageService {
  private editProductPage = new EditProductPage(this.page);
  private productsPage = new ProductsListPage(this.page);
  private deleteModalPage = new DeleteModalPage(this.page);

  @logStep('Update prodcut via UI')
  async update(customProduct?: Partial<IProduct>) {
    const updatedProduct = generateProductData(customProduct);
    await this.editProductPage.fillInputs(updatedProduct);
    await this.editProductPage.clickOnSaveButton();
    await this.productsPage.waitForOpened();
    return updatedProduct;
  }

  @logStep('Delete product on "Edit" page')
  async delete() {
    await this.editProductPage.clickOnDeleteProductButton();
    await this.deleteModalPage.clickOnActionButton();
    await this.productsPage.waitForOpened();
  }
}
