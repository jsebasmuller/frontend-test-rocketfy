import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isOpenNav = false;
  openModal = false;

  closeOpenNav(){
    this.isOpenNav = !this.isOpenNav;
  }

  openCloseModal(openClose: boolean){
    this.openModal = openClose;
  }
}
