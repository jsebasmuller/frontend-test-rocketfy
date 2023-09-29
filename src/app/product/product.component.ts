import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { PaginatedProducts } from 'src/models/paginated-products';
import { Product } from 'src/models/products';
import { ProductParams } from 'src/models/query-filter';
import { loadProducts } from 'src/store/actions/products.actions';
import { ProductState } from 'src/store/reducers/product.reducer';
import { ProductsState } from 'src/store/reducers/products.reducer';
import { getDeleteProductSelector, getProductsSelector } from 'src/store/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  openModal = false;
  params!: ProductParams;
  paramsAux!: ProductParams;
  productSelected!: Product;
  productsPaginated: PaginatedProducts | null = null;
  productState: ProductsState | null = null;
  productDeleteState: ProductState | null = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private readonly store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.store.select(getProductsSelector).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.productState = data;
      this.productsPaginated = data.data;
      if(Number(this.paramsAux?.page!) > Number(this.productsPaginated?.pagination.totalPages!)){
        this.paramsAux.page = 1;
        this.updateParams()
      }
    });
    this.store.select(getDeleteProductSelector).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.productDeleteState = data;
      if(data.product){
        Swal.fire({
          title:'Producto Eliminado',
          text: 'El producto ha sido eliminado satisfactoriamente',
          icon: 'success',
          confirmButtonColor: '#FDE047'
        }).then(result => {
          if (result.isConfirmed){
            this.store.dispatch(loadProducts({ filter: this.params }));
          }
        })
      }
      if(data.error){
        Swal.fire({
          title: 'Error',
          text: data.error.message,
          icon: 'error',
          confirmButtonColor: '#FDE047'
        });
      }
    });
    this.route.queryParams.subscribe(params => {
      this.params = { ...params['keys'], ...params };
      this.paramsAux = {...this.params};
      this.store.dispatch(loadProducts({ filter: this.params }));
    });
  }

  prevPage(page: number) {
    this.paramsAux.page = Number(page) - 1;
    this.updateParams();
  }

  nextPage(page: number) {
    this.paramsAux.page = Number(page) + 1;
    this.updateParams();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setProductModal(product: { product: Product, openModal: boolean }) {
    this.openModal = product.openModal;
    this.productSelected = product.product;
  }

  openCloseModal(openClose: boolean) {
    this.openModal = openClose;
    if (!openClose) {
      this.store.dispatch(loadProducts({ filter: this.params }));
    }
  }

  updateParams() {
    if(Number(this.paramsAux.minPrice!) > Number(this.paramsAux.maxPrice!)){
      this.paramsAux.maxPrice = null;
    }
    if(Number(this.paramsAux.minStock!) > Number(this.paramsAux.maxStock!)){
      this.paramsAux.maxStock = null;
    }
    this.router.navigate(['.'], { queryParams: { ...this.paramsAux }})
  }

  buscar(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      event.preventDefault();
      this.updateParams(); 
    }
  }

  sort(value: string){
    if(value == 'sortCreated'){
      this.paramsAux.sort = 'desc';
      this.paramsAux.sortBy = 'createdAt';
    }
    if(value == 'sortAscPrice'){
      this.paramsAux.sort = 'asc';
      this.paramsAux.sortBy = 'price';
    }
    if(value == 'sortDescPrice'){
      this.paramsAux.sort = 'desc';
      this.paramsAux.sortBy = 'price';
    }
    this.updateParams();
  }
}
