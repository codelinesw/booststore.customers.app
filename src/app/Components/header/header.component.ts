import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Utilities } from 'src/Utils/Utilities';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('shoppingCartSB') shoppingCartSB: ElementRef;
  @Input() title: string;
  enable: boolean = false;
  isLogin: boolean = false;
  constructor(
    private menu: MenuController,
    private utils: Utilities
  ) {}

  ngOnInit() {
    if (this.utils.getSession()) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  openMenu() {
    // alert("open menu "+ this.enable);
    if (!this.enable) {
      this.menu.enable(true, 'first');
      this.menu.open('first');
      this.enable = true;
    } else {
      this.enable = false;
      this.menu.enable(false, 'first');
      this.menu.close();
    }
  }

  openShoppingCart(){
    console.log("abriendo el carrito de compras",this.shoppingCartSB);
    this.shoppingCartSB.nativeElement.classList.toggle('active');
  }
}
