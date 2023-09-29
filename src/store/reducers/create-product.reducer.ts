import { createReducer, on, Action } from '@ngrx/store';
import { createProduct, createProductError, createProductSuccess } from '../actions/products.actions';
import { ProductState } from './product.reducer';

const initialState: ProductState = {
    product: null,
    loading: false,
    error: null
};

export const createProductReducer = createReducer(
    initialState,
    on(createProduct, (currentState) => ({
        ...currentState,
        loading: true
    })),
    on(createProductSuccess, (currentState, action) => ({
        ...currentState,
        loading: false,
        product: action.product,
    })),
    on(createProductError, (currentState, action) => ({
        ...currentState,
        loading: false,
        product: null,
        error: new Error(action.errorMessage)
    })),
);

export function reducer(state: ProductState | undefined, action: Action): any {
    return createProductReducer(state, action);
}

export const getCreatedProduct = (state: ProductState) => {
    return {
        product: state.product,
        loading: state.loading,
        error: state.error
    }
};