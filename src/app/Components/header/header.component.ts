import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Utilities } from 'src/Utils/Utilities';
import { FunctionService } from 'src/Utils/FunctionService';

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
  showBubble: boolean = false;
  products: Array<any> = [];
  qty: number = 0;
  loading: Array<any> = [1, 2, 3];
  loaded: boolean = false;
  subTotalAmount: string = '0';
  totalAmount: string = '0';
  deliveryCost: string = '5000';
  constructor(
    private menu: MenuController,
    public utils: Utilities,
    public events: FunctionService
  ) {}

  ngOnInit() {
    if (this.utils.getSession()) {
      this.totalAmount = '0';
      this.subTotalAmount = '0';
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    this.products = [];
    this.events.getProductOnCart().subscribe((product) => {
      console.log('Response product :: ', product);
      if (product) {
        let find = null,
          findIndex = 0;
        find = this.products.find((item) => item.id == product.id);
        findIndex = this.products.findIndex((item) => item.id == product.id);
        if (find) {          
          if (parseInt(product.qty) > 0) {
            this.products[findIndex].qty = product.qty;
            this.products[findIndex].amountSale = product.amountSale;
          } else {
            this.products.splice(findIndex,1);
            this.showBubble = false;
          }
        } else {          
          this.products.push(product);
        }

        if (this.products.length > 0) {
          this.showBubble = true;
        } else {
          this.showBubble = false;
        }
        
        this.loaded = false;
        let total = 0,
          deliveryCost = parseInt(this.deliveryCost);
        for (let index = 0; index < this.products.length; index++) {
          total += parseInt(this.products[index].amountSale);
        }
        this.subTotalAmount = total.toString();
        this.totalAmount = (total + deliveryCost).toString();
      } else {
        this.showBubble = false;
        this.loaded = true;
      }
    });
    this.products = this.utils.getProductsCart();
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

  openShoppingCart() {
    console.log('abriendo el carrito de compras', this.shoppingCartSB);
    this.shoppingCartSB.nativeElement.classList.toggle('active');
  }

  closeShoppingCart() {
    console.log('cerrando el carrito de compras', this.shoppingCartSB);
    this.shoppingCartSB.nativeElement.classList.remove('active');
  }

  decreaseAmount(item, index) {
    console.log('Desminuyendo la cantidad :: ', item);
    if (item.qty >= 1) {
      let qty = item.qty - 1;
      this.products[index] = {
        ...item,
        ...{ qty: qty, totalQty: item.totalQty - 1 },
      };
    }
  }

  increaseAmount(item, index) {
    console.log('aumentando la cantidad :: ', item);
    if (item.qty >= 0) {
      let qty = item.qty + 1;
      this.products[index] = {
        ...item,
        ...{ qty: qty, totalQty: item.totalQty + 1 },
      };
      console.log('item :: ', {
        ...item,
        ...{ qty: item.qty + 1, totalQty: item.totalQty + 1 },
      });
    }
  }
}
