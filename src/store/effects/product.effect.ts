import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  of,
} from 'rxjs';
import {
  loadProductsSuccess,
  loadProducts,
  loadProductsError,
  getProductById,
  getProductByIdSuccess,
  getProductByIdError,
  createProduct,
  createProductSuccess,
  createProductError,
  deleteProduct,
  deleteProductSuccess,
  deleteProductError,
  editProduct,
  editProductSuccess,
  editProductError,
  resetProduct
} from '../actions/products.actions';
import { ProductsService } from 'src/app/services/products.service';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) { }

  loadProductsFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      exhaustMap((initAction) =>
        this.productService.getProductsFilter(initAction.filter).pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError((error) => {
            return of(
              loadProductsError({
                errorMessage: error.error.message,
              })
            )
          }
          )
        )
      )
    )
  );

  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProductById),
      exhaustMap((initAction) =>
        this.productService.getProductById(initAction.id).pipe(
          map((product) => getProductByIdSuccess({ product })),
          catchError((error) => {
            return of(
              getProductByIdError({
                errorMessage: error.error.message,
              })
            )
          })
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProduct),
      exhaustMap((initAction) =>
        this.productService.createProduct(initAction.product).pipe(
          map((product) => createProductSuccess({ product })),
          catchError((error) => {
            return of(
              createProductError({
                errorMessage: error.error.message,
              })
            )
          })
        )
      )
    )
  );

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editProduct),
      exhaustMap((initAction) =>
        this.productService.updateProduct(initAction.product).pipe(
          map((product) => editProductSuccess({ product })),
          catchError((error) => {
            return of(
              editProductError({
                errorMessage: error.error.message,
              })
            )
          })
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      exhaustMap((initAction) =>
        this.productService.deleteProduct(initAction.id).pipe(
          map((product) => deleteProductSuccess({ product })),
          catchError((error) => {
            return of(
              deleteProductError({
                errorMessage: error.error.message,
              })
            )
          })
        )
      )
    )
  );
}