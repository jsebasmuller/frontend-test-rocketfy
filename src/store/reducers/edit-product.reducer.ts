import { createReducer, on, Action } from '@ngrx/store';
import { editProduct, editProductError, editProductSuccess, resetProduct } from '../actions/products.actions';
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

export const editProductReducer = createReducer(
    initialState,
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
    on(resetProduct, (currentState) => ({
        ...initialState
    }))
);

export function reducer(state: ProductState | undefined, action: Action): any {
    return editProductReducer(state, action);
}

export const getEditedProduct = (state: ProductState) => {
    return {
        product: state.product,
        loading: state.loading,
        error: state.error
    }
};