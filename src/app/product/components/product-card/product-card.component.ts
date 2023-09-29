import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from 'src/models/products';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() openModalEmitter = new EventEmitter<{product: Product, openModal: boolean}>();
  constructor(
    private sanitizer: DomSanitizer
  ){}

  sanitizeImage(base64: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }

  openModal(){
    this.openModalEmitter.emit({product: this.product, openModal: true});
  }
}
