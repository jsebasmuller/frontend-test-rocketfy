import { createReducer, on, Action } from '@ngrx/store';
import { createProduct, createProductError, createProductSuccess, deleteProduct, deleteProductError, deleteProductSuccess, editProduct, editProductError, editProductSuccess, getProductById, getProductByIdError, getProductByIdSuccess } from '../actions/products.actions';
import { Product } from 'src/models/products';

export interface ProductState {
    product: Product | null;
    loading: boolean;
    error: Error | null;
}

const initialState: ProductState = {
    product: null,
    loading: false,
    error: null
};

export const productReducer = createReducer(
    initialState,
    on(getProductById, (currentState) => ({
        ...currentState,
        loading: true
    })),
    on(getProductByIdSuccess, (currentState, action) => ({
        ...currentState,
        loading: false,
        product: action.product,
    })),
    on(getProductByIdError, (currentState, action) => ({
        ...currentState,
        loading: false,
        product: null,
        error: new Error(action.errorMessage)
    })),
    on(editProduct, (currentState) => ({
        ...currentState,
        loading: true
    })),
    on(editProductSuccess, (currentState, action) => ({
        ...currentState,
        loading: false,
        product: action.product,
    })),
    on(editProductError, (currentState, action) => ({
        ...currentState,
        loading: false,
        product: null,
        error: new Error(action.errorMessage)
    })),
    on(deleteProduct, (currentState) => ({
        ...currentState,
        loading: true
    })),
    on(deleteProductSuccess, (currentState, action) => ({
        ...currentState,
        loading: false,
        product: action.product,
    })),
    on(deleteProductError, (currentState, action) => ({
        ...currentState,
        loading: false,
        product: null,
        error: new Error(action.errorMessage)
    }))
);

export function reducer(state: ProductState | undefined, action: Action): any {
    return productReducer(state, action);
}

export const getProduct = (state: ProductState) => {
    return {
        product: state.product,
        loading: state.loading,
        error: state.error
    }
};