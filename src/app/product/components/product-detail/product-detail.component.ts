import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/models/products';
import { deleteProduct, getProductById, resetProduct } from 'src/store/actions/products.actions';
import { ProductState } from 'src/store/reducers/product.reducer';
import { getDeleteProductSelector, getEditProductSelector, getProductSelector } from 'src/store/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  id: string = '';
  openModal = false;
  product: Product | null = null;
  productState: ProductState | null = null;
  productDeletedState: ProductState | null = null;
  productEditedState: ProductState | null = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private readonly store: Store,
    private sanitizer: DomSanitizer,
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.store.select(getProductSelector).pipe(
        takeUntil(this.destroy$)
      ).subscribe(data => {
        this.productState = data;
        this.product = data.product;
      });
    });    
    
    this.store.select(getDeleteProductSelector).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.productDeletedState = data;
      if(this.productDeletedState.product){
        Swal.fire({
          title: 'Producto Eliminado',
          text: 'El producto ha sido eliminado satisfactoriamente',
          confirmButtonColor: '#FDE047',
          icon: 'success'
        }).then(result => {
          if(result.isConfirmed){
            this.store.dispatch(resetProduct());
            this.router.navigate(['/']);
          }
        })
      }
    });

    this.store.select(getEditProductSelector).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.productEditedState = data;
      if(this.productEditedState.product){
        Swal.fire({
          title: 'Producto Editado',
          text: 'El producto ha sido editado satisfactoriamente',
          confirmButtonColor: '#FDE047',
          icon: 'success'
        }).then(result => {
          if(result.isConfirmed){
            this.store.dispatch(resetProduct());
            this.openCloseModal(false);
          }
        })
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(getProductById({id: this.id}));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  sanitizeImage(base64: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }

  openCloseModal(event: any){
    this.openModal = event;
    if(!event){
      this.store.dispatch(getProductById({ id: this.id }));
    }
  }

  confirmDeleteProduct(){
    Swal.fire({
      title: '¡Advertencia!',
      text: `¿Estás seguro que deseas borrar el producto ${this.product?.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#FDE047'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(deleteProduct({id: this.id}));
      };
    });
  }
}
