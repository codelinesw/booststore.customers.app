import { Component, OnInit } from '@angular/core';
import { FunctionService } from 'src/Utils/FunctionService';
import { Platform } from '@ionic/angular';

// import the services
import { ProductsService } from "src/app/services/Products/products.service";
import { Utilities } from 'src/Utils/Utilities';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.page.html',
  styleUrls: ['./view-products.page.scss'],
})
export class ViewProductsPage implements OnInit {
  Product: any = { salesPrice: '0' };
  Colors: Array<string> = [];
  image: string = null;
  qty: number = 0;
  pCart: Array<any> = [];
  constructor(
    public utils: Utilities,
    public events: FunctionService,
    public productsService: ProductsService,
    public platform: Platform
  ) {}

  async ionViewWillEnter() {
    const idProduct = this.platform.getQueryParam('idProduct');
    const idShop = this.platform.getQueryParam('idShop');
    if (idProduct && idShop) {
      await this.getProductById(idProduct, idShop);
    }
  }

  ngOnInit() {}
  addPTocart() {
    // alert("Agregando al carrito ->");
    this.increaseAmount();    
  }

  async getProductById(idProduct, idShop) {
    const requestProductById = await this.productsService.listProductById({
      idProducts: idProduct,
      idShop: idShop,
    });
    const responseRequestProductById = await requestProductById.json();
    var images = [];
    for (let i = 0; i < responseRequestProductById.length; i++) {
      images = JSON.parse(responseRequestProductById[i].image);
      for (let j = 0; j < images.length; j++) {
        images[j].baseFile = images[j].baseFile;
        console.log('file :: ', images[j].baseFile);
      }
      responseRequestProductById[i].image = images;
    }
    this.Product = responseRequestProductById[0];
    try {
      this.Colors = JSON.parse(this.Product.color);
    } catch (error) {
      this.Colors = [];
    }
    console.log('informacion del producto actual -> ', this.Product);
    console.warn('colores del producto -> ', this.Colors);
    this.image = this.Product.image[0].baseFile;
  }

  decreaseAmount() {
    console.log('Desminuyendo la cantidad :: ');
    if (this.qty >= 1) {
      this.qty = this.qty - 1;
      let product  = {
        id: this.platform.getQueryParam('idProduct'),
        productName: this.Product.name,
        qty: this.qty,
        image: this.image,
        amountSale: (parseInt(this.Product.salesPrice) * this.qty).toString(),
      };
      this.events.addPToCart(product);
      this.saveProducstCart(product);
    }
  }

  increaseAmount() {
    console.log('aumentando la cantidad :: ');
    if (this.qty >= 0) {      
      this.qty = this.qty + 1;
      let product = {
        id: this.platform.getQueryParam('idProduct'),
        productName: this.Product.name,
        qty: this.qty,
        image: this.image,
        amountSale: (parseInt(this.Product.salesPrice) * this.qty).toString(),
      };
      this.events.addPToCart(product);
      this.saveProducstCart(product);
    }
  }

  saveProducstCart(product: any){
    let find = null,
    findIndex = 0;
    find = this.pCart.find((item) => item.id == product.id);
    findIndex = this.pCart.findIndex((item) => item.id == product.id);
    let productTmp = [];
    if (find) {
      if (parseInt(product.qty) > 0) {
        this.pCart[findIndex].qty = product.qty;
        this.pCart[findIndex].amountSale = product.amountSale;
      } else {
        this.pCart.splice(findIndex,1);
      }
    } else {
      this.pCart.push(product);
    }
    let currentProducts = this.utils.getProductsCart();
    this.utils.saveProductsCart(this.pCart);
  }
}
