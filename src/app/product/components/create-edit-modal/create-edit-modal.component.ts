import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/models/products';
import { createProduct, editProduct, resetProduct } from 'src/store/actions/products.actions';
import { ProductState } from 'src/store/reducers/product.reducer';
import { getCreateProductSelector, getEditProductSelector } from 'src/store/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit-modal',
  templateUrl: './create-edit-modal.component.html',
  styleUrls: ['./create-edit-modal.component.scss']
})
export class CreateEditModalComponent implements OnChanges, OnDestroy {
  productCreateState: ProductState | null = null;
  productEditState: ProductState | null = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  form: FormGroup;
  name: FormControl;
  description: FormControl;
  price: FormControl;
  stock: FormControl;
  sku: FormControl;
  image: FormControl;
  tags: FormControl;
  imageBase64!: string | undefined;
  isInvalidImage: boolean = false;
  @Input() createOrEdit!: 'edit' | 'create';
  @Input() isOpenModal:boolean = false;
  @Input() product!: Product;
  @Output() emitCloseModal = new EventEmitter<boolean>();
  titleModal!: string;
  textButton!: string;

  constructor(
    private sanitizer: DomSanitizer,
    private readonly store: Store
  ) {
    this.name = new FormControl('', [Validators.required]);
    this.description = new FormControl('');
    this.price = new FormControl('', [Validators.required, Validators.min(1000), Validators.max(999999999)]);
    this.stock = new FormControl('', [Validators.required, Validators.min(1), Validators.max(999999)]);
    this.sku = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.tags = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{1,20}(?:\s*,\s*[a-zA-Z]{1,20})*$/i)]);
    this.image = new FormControl('');
    this.form = new FormGroup({
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      sku: this.sku,
      tags: this.tags,
      image: this.image
    });
    
    this.store.select(getCreateProductSelector).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.productCreateState = data;
      if(this.productCreateState.product){
        Swal.fire({
          title: 'Producto Creado',
          text: 'Su producto ha sido creado satisfactoriamente',
          icon: 'success',
          confirmButtonColor: '#FDE047'
        }).then(result => {
          if (result.isConfirmed) {
            this.store.dispatch(resetProduct());
            this.form.reset();
            this.deleteImage();
            this.closeModal();
          }
        });
      }
      if(this.productCreateState.error){
        Swal.fire({
          title: 'Error',
          text: this.productCreateState.error.message,
          icon: 'error',
          confirmButtonColor: '#FDE047'
        });
      }
    });

    this.store.select(getEditProductSelector).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.productEditState = data;
      if(this.productEditState.product){
        Swal.fire({
          title: 'Producto Editado',
          text: 'Su producto ha sido editado satisfactoriamente',
          icon: 'success',
          confirmButtonColor: '#FDE047'
        }).then(result => {
          if (result.isConfirmed) {
            this.store.dispatch(resetProduct());
            this.form.reset();
            this.deleteImage();
            this.closeModal();
          }
        });
      }
      if(this.productEditState.error){
        Swal.fire({
          title: 'Error',
          text: this.productEditState.error.message,
          icon: 'error',
          confirmButtonColor: '#FDE047'
        });
      }
    });
  }

  ngOnInit() {
    if(this.createOrEdit === 'edit') {
      this.titleModal = "Edita tu producto";
      this.textButton = "Editar";
      
    } else {
      this.titleModal = "Crea tu producto";
      this.textButton = "Crear";
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnChanges(){
    if (this.product){
      this.name.setValue(this.product.name);
      this.description.setValue(this.product.description);
      this.price.setValue(this.product.price);
      this.stock.setValue(this.product.stock);
      this.sku.setValue(this.product.sku);
      this.tags.setValue(this.product.tags.toString());
      this.imageBase64 = this.product.image;
    }
  }

  closeModal() {
    this.form.reset();
    this.emitCloseModal.emit(false);
  }

  createEditProduct(){
    if (this.form.valid) {
      const product: Product = {
        name: this.name.value,
        description: this.description.value,
        image: this.imageBase64,
        price: this.price.value,
        stock: this.stock.value,
        tags: this.tags.value.split(","),
        sku: this.sku.value
      } as Product;
      if(this.createOrEdit === 'create'){
        this.store.dispatch(createProduct({product: product}));
      } else {
        product.id = this.product.id;
        this.store.dispatch(editProduct({product: product}));
      }
    } else {
      this.name.markAsTouched();
      this.price.markAsTouched();
      this.stock.markAsTouched();
      this.sku.markAsTouched();
      this.tags.markAsTouched();
    }
  }

  onFileSelected(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    if (element && element.files != null){
      const file = element.files[0];
      if (file.size < 2000000) {
        var reader = new FileReader();
        reader.onloadend = this.handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
      } else {
        this.isInvalidImage = true;
        this.deleteImage();
        Swal.fire({
          title:'Imagen demasiado pesada',
          text:'Recuerda que el tamaño máximo para la imagen es de 2MB',
          icon:'warning',
          confirmButtonColor: '#FDE047'
        });
      }
    }
  }

  handleReaderLoaded(readerEvt: ProgressEvent<FileReader>) {
    if (readerEvt.target){
      let binary = readerEvt.target.result;
      this.imageBase64 = binary as string;
    }
  }

  sanitizeImage(base64: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }

  deleteImage(){
    this.imageBase64 = undefined;
    this.image.reset();
  }
}
