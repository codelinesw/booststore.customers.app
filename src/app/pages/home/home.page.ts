import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Color, BaseChartDirective, Label } from 'ng2-charts';


// import the services
import { IndicatorsService } from "src/app/services/Indicators/indicators.service";
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

  selectedTab: any = 0;
  

  constructor(
    private router: Router,
    public platform: Platform,
    public utils: Utilities,
    private indicatorService: IndicatorsService
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
        
      }
    } catch (error) {
      console.log('Error :: ', error);
    }
  }

  selectTab($event,tab: number){

  }

  goToPage(page: string) {
    return this.router.navigate([page]);
  }
}
