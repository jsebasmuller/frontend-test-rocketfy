import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { resetProduct } from 'src/store/actions/products.actions';
import { getCreateProductSelector } from 'src/store/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isOpenNav = false;
  openModal = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store){
    this.store.select(getCreateProductSelector).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if(data.product){
        this.store.dispatch(resetProduct());
        this.openCloseModal(false);
      }
    });
  }

  closeOpenNav(){
    this.isOpenNav = !this.isOpenNav;
  }

  openCloseModal(openClose: boolean){
    this.openModal = openClose;
  }
}
