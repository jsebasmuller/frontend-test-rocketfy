import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/models/products';
import { getProductById } from 'src/store/actions/products.actions';
import { ProductState } from 'src/store/reducers/product.reducer';
import { getProductSelector } from 'src/store/store';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  id: string = '';
  product: Product | null = null;
  productState: ProductState | null = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private route: ActivatedRoute, 
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
}
