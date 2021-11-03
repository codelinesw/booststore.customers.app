import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { OfficeModel } from 'src/app/Models/OfficeModel';
import { WarehouseModel } from 'src/app/Models/WarehouseModel';

@Component({
  selector: 'app-pop-up-search-filter',
  templateUrl: './pop-up-search-filter.component.html',
  styleUrls: ['./pop-up-search-filter.component.scss'],
})
export class PopUpSearchFilterComponent implements OnInit {
  Offices: Array<OfficeModel> = [];
  Warehouses: Array<WarehouseModel> = [];
  filter: any = {};

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.Offices = this.navParams.data.Offices;
    this.Warehouses = this.navParams.data.Warehouses;
    this.filter.idOffice = this.navParams.data.idOffice;
    this.filter.idWarehouse = this.navParams.data.idWarehouse;
  }

  ionViewWillEnter(){
    this.filter.idOffice = this.navParams.data.idOffice;
    this.filter.idWarehouse = this.navParams.data.idWarehouse;
  }

  async closePopUp() {
    await this.modalController.dismiss(this.filter);
  }

  OnChangeOffice($event) {
    this.filter.idOffice = $event.target.value;
  }

  OnChangeWarehouse($event) {
    this.filter.idWarehouse = $event.target.value;
  }

  async save() {
    await this.modalController.dismiss(this.filter);
  }

}
