import { createReducer, on, Action } from '@ngrx/store';
import { loadProducts, loadProductsSuccess, loadProductsError } from '../actions/products.actions';
import { PaginatedProducts } from 'src/models/paginated-products';

export interface ProductsState {
    data: PaginatedProducts | null;
    loading: boolean;
    error: Error | null;
}

const initialState: ProductsState = {
    data: null,
    loading: false,
    error: null
};

export const productsReducer = createReducer(
    initialState,
    on(loadProducts, (currentState) => ({
        ...currentState,
        loading: true
    })),
    on(loadProductsSuccess, (currentState, action) => ({
        ...currentState,
        loading: false,
        data: action.products,
    })),
    on(loadProductsError, (currentState, action) => ({
        ...currentState,
        loading: false,
        data: null,
        error: new Error(action.errorMessage)
    }))
);

export function reducer(state: ProductsState | undefined, action: Action): any {
    return productsReducer(state, action);
}

export const getProducts = (state: ProductsState) => {
    return {
        data: state.data,
        loading: state.loading,
        error: state.error
    }
};