import { createReducer, on, Action } from '@ngrx/store';
import { deleteProduct, deleteProductError, deleteProductSuccess } from '../actions/products.actions';
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

export const deleteProductReducer = createReducer(
    initialState,
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
    return deleteProductReducer(state, action);
}

export const getDeletedProduct = (state: ProductState) => {
    return {
        product: state.product,
        loading: state.loading,
        error: state.error
    }
};