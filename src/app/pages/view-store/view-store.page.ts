import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopModel } from 'src/app/Models/ShopModel';
import { Platform } from '@ionic/angular';
import { Utilities } from 'src/Utils/Utilities';

// import the services
import { ShopService } from "src/app/services/Shop/shop.service";
import { CategoriesService } from 'src/app/services/Categories/categories.service';
import { ProductsService } from 'src/app/services/Products/products.service';


@Component({
  selector: 'app-view-store',
  templateUrl: './view-store.page.html',
  styleUrls: ['./view-store.page.scss'],
})
export class ViewStorePage implements OnInit {
  selectedTab: any = 0;
  Categories: Array<any> = [];
  Products: Array<any> = [];
  Shop: any = <ShopModel>{};
  idShop: number = 0;
  constructor(
    public utils: Utilities,
    private router: Router,
    public platform: Platform,
    private shopService: ShopService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    try {
      const idShop = this.platform.getQueryParam('idShop');
      if (idShop) {
        this.idShop = parseInt(idShop);
        await this.getShopById();
        await this.getCategoriesByOffice();
        await this.getProductsByCategories();        
      }
    } catch (error) {
      console.log('Error :: ', error);
    }
  }

  setPaymentMethod(obj: any) {
    try {
      localStorage.setItem('paymentMethod', JSON.stringify(obj));
      return true;
    } catch (error) {
      return false;
    }
  }

  async getShopById() {
    const requestShops = await this.shopService.getShopById({
      idShop: this.idShop,
    });
    const responseRShop = await requestShops.json();
    if (!responseRShop.message) {
      console.log('Informacion de la tienda -> ', responseRShop);
      this.Shop = responseRShop.length > 0 ? responseRShop[0] : {};
      this.setPaymentMethod({ paymentMethod: this.Shop.idPaymentMethod });
    }
  }

  async getCategoriesByOffice() {
    const requestCategories =
      await this.categoriesService.getCategoriesByMainOffice({
        idShop: this.idShop,
      });
    const responseRCategories = await requestCategories.json();
    if (!responseRCategories.message) {
      console.log('categorias de la tienda -> ', responseRCategories);
      this.Categories = responseRCategories;
      //this.selectedTab =
      //this.Categories.length > 0 ? this.Categories[0].idCategory : '0';
      console.log('Categorias seleccionada por defecto ', this.selectedTab);
    }
  }

  async getProductsByCategories() {
    const requestProducts = await this.productsService.getProductsByCategories({
      idShop: this.idShop,
      idCategory: this.selectedTab,
    });
    const responseRProducts = await requestProducts.json();
    if (!responseRProducts.message) {
      console.log('productos de la tienda -> ', responseRProducts);
      var images = [],
        products: any = [],
        find = null,
        findIndex = 0;

      for (let i = 0; i < responseRProducts.length; i++) {
        findIndex = products.findIndex(
          (item) => item.category == responseRProducts[i].categoryName
        );
        find = products.find(
          (item) => item.category == responseRProducts[i].categoryName
        );
        if (find) {
          products[findIndex].products.push({
            idProducts: responseRProducts[i].idProducts,
            productName: responseRProducts[i].productName,
            image: JSON.parse(responseRProducts[i].image)[0].baseFile,
            offSale: responseRProducts[i].offSale,
            salesPrice: responseRProducts[i].salesPrice,
          });
        } else {
          products.push({
            category: responseRProducts[i].categoryName,
            products: [
              {
                idProducts: responseRProducts[i].idProducts,
                productName: responseRProducts[i].productName,
                image: JSON.parse(responseRProducts[i].image)[0].baseFile,
                offSale: responseRProducts[i].offSale,
                salesPrice: responseRProducts[i].salesPrice,
              },
            ],
          });
        }
      }

      console.warn('Response get all products :: ', products);
      this.Products = products;
    }
  }

  async selectTab($event, tab: number) {
    this.selectedTab = tab;
    $event.target.parentNode.classList.toggle('selected');
    $event.target.classList.toggle('selected');
    await this.getProductsByCategories();
  }

  goToPage(page: string, idProduct) {
    return this.router.navigate([page], {
      queryParams: { idProduct: idProduct, idShop: this.idShop },
    });
  }

  getFormatHours(hour) {
    if (hour) {
      let currentHour = hour.split(':');
      let isDay = parseInt(currentHour[0]) <= 12 ? 'am' : 'pm';
      return `${currentHour[0]}:${currentHour[1]} ${isDay}`;
    }
    return '00:00';
  }

  getIcon(category) {
    
    if (category.includes('burguer') || category.includes('guesa')) {
      return 'fast-food-outline';
    }

    if (
      category.includes('sound') ||
      category.includes('soni') ||
      category.includes('fles')
    ) {
      return 'musical-note-outline';
    }

    if (
      category.includes('audi') ||
      category.includes('auri') ||
      category.includes('libres')
    ) {
      return 'volume-high-outline';
    }

    if (category.includes('tecno')) {
      return 'rocket-outline';
    }

    if (category.includes('todos')) {
      return 'keypad-outline';
    }

    return 'star-outline';

  }
}
