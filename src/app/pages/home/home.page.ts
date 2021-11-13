import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Color, BaseChartDirective, Label } from 'ng2-charts';


// import the services
import { ShopService } from "src/app/services/Shop/shop.service";
import { Utilities } from 'src/Utils/Utilities';
var _this;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  _this = this;
  options = {
    slidesPerView: 3.4,
    centerSlides: true,
    spaceBetween: 5,
  };

  selectedTab: any = 7;
  Shops: Array<any> = [];
  

  constructor(
    private router: Router,
    public platform: Platform,
    public utils: Utilities,
    private shopService: ShopService
  ) {
    this.options.slidesPerView =
      !this.platform.is('android') || !this.platform.is('ios') ? 8 : 3.4;
  }

  ngOnInit() {
    _this = this;
  }

  async ionViewWillEnter() {
    _this = this;
    try {
      if (this.utils.getSession()) {
        const { idShop, idOffice, openingHours, closingTime } =
          this.utils.getSession();
        await this.getShopByClassification();
      }
    } catch (error) {
      console.log('Error :: ', error);
    }
  }

  async getShopByClassification(){
    const requestShops = await this.shopService.getShopByClassification({
      idClassification: this.selectedTab,
    });
    const responseRShop = await requestShops.json();
    if (!responseRShop.message) {
      this.Shops = responseRShop;
    }
  }

  async selectTab($event,tab: number){
    this.selectedTab = tab;
    await this.getShopByClassification();
  }

  goToPage(page: string,params?: any) {
    return this.router.navigate([page], { queryParams: { ...params } });
  }
}
