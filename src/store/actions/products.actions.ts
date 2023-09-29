import { createAction, props } from '@ngrx/store';
import { PaginatedProducts } from 'src/models/paginated-products';
import { Product } from 'src/models/products';
import { ProductParams } from 'src/models/query-filter';

export const loadProducts = createAction(
    '[Product API] Load Products Filters',
    props<{ filter: ProductParams }>()
);

export const loadProductsSuccess = createAction(
  '[Product API] Load Products Filters Success',
  props<{ products: PaginatedProducts }>()
);

export const loadProductsError = createAction(
  '[Product API] Load Products Filters Error',
  props<{ errorMessage: string }>()
);

export const getProductById = createAction(
  '[Product API] Load ProductById',
  props<{ id: string }>()
);

export const getProductByIdSuccess = createAction(
  '[Product API] Load ProductById Success',
  props<{ product: Product }>()
)

export const getProductByIdError = createAction(
  '[Product API] Load ProductById Error',
  props<{ errorMessage: string }>()
);

export const createProduct = createAction(
  '[Product API] Create Product',
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  '[Product API] Create Product Success',
  props<{ product: Product }>()
)

export const createProductError = createAction(
  '[Product API] Create Product Error',
  props<{ errorMessage: string }>()
);

export const editProduct = createAction(
  '[Product API] Edit Product',
  props<{ product: Product }>()
);

export const editProductSuccess = createAction(
  '[Product API] Edit Product Success',
  props<{ product: Product }>()
)

export const editProductError = createAction(
  '[Product API] Edit Product Error',
  props<{ errorMessage: string }>()
);

export const deleteProduct = createAction(
  '[Product API] Delete Product',
  props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product API] Delete Product Success',
  props<{ product: Product }>()
)

export const deleteProductError = createAction(
  '[Product API] Delete Product Error',
  props<{ errorMessage: string }>()
);
