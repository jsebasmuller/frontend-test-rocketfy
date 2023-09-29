import { ProductsState, getProducts, reducer as reducerProducts } from './reducers/products.reducer';
import { ProductState, getProduct, reducer as reducerProduct } from './reducers/product.reducer';
import { getCreatedProduct, reducer as reducerCreateProduct } from './reducers/create-product.reducer';
import { getEditedProduct, reducer as reducerEditProduct } from './reducers/edit-product.reducer';
import { getDeletedProduct, reducer as reducerDeleteProduct } from './reducers/delete-product.reducer';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

export const getProductsState = createFeatureSelector<ProductsState>('products');
export const getProductState = createFeatureSelector<ProductState>('product');
export const createdProductState = createFeatureSelector<ProductState>('createdProduct');
export const editedProductState = createFeatureSelector<ProductState>('editedProduct');
export const deletedProductState = createFeatureSelector<ProductState>('deletedProduct');

interface State {
    products: ProductsState,
    product: ProductState,
    createdProduct: ProductState,
    editedProduct: ProductState,
    deletedProduct: ProductState,
}

export const reducers: ActionReducerMap<State> = {
    products: reducerProducts,
    product: reducerProduct,
    createdProduct: reducerCreateProduct,
    editedProduct: reducerEditProduct,
    deletedProduct: reducerDeleteProduct,
  };

export const getProductsSelector = createSelector(
  getProductsState,
  getProducts
);

export const getProductSelector = createSelector(
  getProductState,
  getProduct
);

export const getCreateProductSelector = createSelector(
  createdProductState,
  getCreatedProduct
)

export const getEditProductSelector = createSelector(
  editedProductState,
  getEditedProduct
)

export const getDeleteProductSelector = createSelector(
  deletedProductState,
  getDeletedProduct
)