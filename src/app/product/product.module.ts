import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routing.module';
import { LoadingComponent } from './components/loading/loading.component';
import { CreateEditModalComponent } from './components/create-edit-modal/create-edit-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductDetailComponent,
    ProductComponent,
    LoadingComponent,
    CreateEditModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    MatIconModule
  ],
  exports: [
    CreateEditModalComponent
  ]
})
export class ProductModule { }
