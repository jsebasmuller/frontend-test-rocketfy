import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Product } from 'src/models/products';
import { deleteProduct } from 'src/store/actions/products.actions';
import { ProductState } from 'src/store/reducers/product.reducer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnDestroy {
  productState: ProductState | null = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() product!: Product;
  @Output() openModalEmitter = new EventEmitter<{product: Product, openModal: boolean}>();
  constructor(
    private sanitizer: DomSanitizer,
    private readonly store: Store
  ){
    
  }

  sanitizeImage(base64: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }

  openModal(){
    this.openModalEmitter.emit({product: this.product, openModal: true});
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  confirmDeleteProduct(){
    Swal.fire({
      title: '¡Advertencia!',
      text: `¿Estás seguro que deseas borrar el producto ${this.product.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#FDE047'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct();
      };
    });
  }

  deleteProduct(){
    this.store.dispatch(deleteProduct({id: this.product.id}));
  }
}
