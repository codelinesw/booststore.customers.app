import { Component, OnInit } from '@angular/core';
import { Utilities } from 'src/Utils/Utilities';

// import the services
import { SalesService } from 'src/app/services/Sales/sales.service';

import { ModalController } from '@ionic/angular';
import { PopUpProcessDeliveryComponent } from 'src/app/Components/PopUps/pop-up-process-delivery/pop-up-process-delivery.page';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  Sales: Array<any> = [];
  constructor(
    public utils: Utilities,
    private salesService: SalesService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    try {
      if (this.utils.getSession()) {
        const { idShop, idOffice } = await this.utils.getSession();

        const requestSales = await this.salesService.listSalesByOffice({
          idShop: idShop,
          idOffice: idOffice,
        });
        const responseRequestSales = await requestSales.json();
        this.Sales = responseRequestSales;
        console.log('Response Request Sales -> ', responseRequestSales);
      }
    } catch (error) {
      console.log('Error :: ', error);
    }
  }

  async openPopUpProcessDelivery(
    idSale: number,
    idClient: number,
    salesAddress?: string
  ) {
    const modal = await this.modalController.create({
      component: PopUpProcessDeliveryComponent,
      cssClass: 'customModal',
      componentProps: {
        idSale: idSale,
        idClient: idClient,
        salesAddress: salesAddress,
      },
    });
    return await modal.present();
  }

  async closePopUpProcessDelivery() {
    await this.modalController.dismiss(null);
  }
}
