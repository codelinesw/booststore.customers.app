import { Component, OnInit } from '@angular/core';
import {
  Platform,
  ModalController
} from '@ionic/angular';
// import the utilities
import { Utilities } from "src/Utils/Utilities";

// import the models
import { HomeDeliveryModel } from 'src/app/Models/HomeDeliveryModel';

// import the services
import { HomeDeliveryService } from 'src/app/services/HomeDelivery/home-delivery.service';

// import modal 
import { PopUpTrackOrderComponent } from 'src/app/Components/PopUps/pop-track-order/pop-up-track-order.component';


@Component({
  selector: 'app-home-delivery',
  templateUrl: './home-delivery.page.html',
  styleUrls: ['./home-delivery.page.scss'],
})
export class HomeDeliveryPage implements OnInit {
  Deliverers: HomeDeliveryModel[] = [];
  state: string = 'ONHOLD';
  buttonText: string = 'Despachar';
  rolId: number = 0;
  visible: boolean = false;
  status: any = {
    ONHOLD: 'Despachar',
    ONROUTE: 'Entregado',
  };
  estados = {
    ONHOLD: 'ONROUTE',
    ONROUTE: 'COMPLETED',
  };
  constructor(
    public utils: Utilities,
    private homeDeliveryService: HomeDeliveryService,
    private platform: Platform,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    try {
      if (
        this.platform.is('ios') ||
        this.platform.is('android') ||
        this.platform.is('cordova')
      ) {
        this.visible = false;
      } else {
        this.visible = true;
      }
      if (this.utils.getSession()) {
        const { name, idShop, idOffice, idStoreUser, idRol } =
          await this.utils.getSession();
        console.log('Rol de usuario :: ', idRol);
        // We get all the locations available for the store
        const requestDeliverers =
          idRol === '4'
            ? await this.homeDeliveryService.listHomeDeliveryByEmployee({
                idShop: idShop,
                idOffice: idOffice,
                idStoreUser: idStoreUser,
              })
            : await this.homeDeliveryService.listHomeDeliveryByOffice({
                idShop: idShop,
                idOffice: idOffice,
              });
        const responseRequestDeliverers = await requestDeliverers.json();
        console.log('Get all Deliverers :: ', responseRequestDeliverers);
        this.Deliverers = responseRequestDeliverers;
        this.buttonText = this.status[this.state];
      }
    } catch (error) {}
  }

  async upHomeDeliverySate(id: number) {
    console.log('status -> ', this.status + ' id -> ' + id);

    if (this.state !== 'COMPLETED') {
      let state = this.estados[this.state];

      try {
        this.utils.showLoading('Cargando... ');

        const requestUpdate =
          await this.homeDeliveryService.updateHomeDeliveryState({
            idHomeDelivery: id,
            status: state,
          });

        const responseRUpdate = await requestUpdate.json();

        this.utils.hideLoader();

        if (!responseRUpdate.message) {
          this.state = responseRUpdate.status;
          this.buttonText = this.status[this.state];
          this.utils.showToast(
            'Domiclios',
            'Se ha modificado el estado del domicilio correctamente',
            'SUCCESS'
          );
        }

        if (responseRUpdate.message) {
          this.state = responseRUpdate.status;
          this.buttonText = this.status[this.state];
          this.utils.showToast('Domiclios', responseRUpdate.message, 'FAILED');
        }
      } catch (error) {
        this.utils.showToast('Domiclios', error, 'ERROR');

        this.utils.hideLoader();
      }
    } else {
      this.utils.showToast(
        'Domiclios',
        'No se puede modificar el estado del domicilio por que ya fue entregado',
        'WARNING'
      );
    }
  }

  searchItems($event) {}

  async openPopUpTrackOrder(address?: string,idSale?:string) {
    console.log("Abriendo modal");
    const modal = await this.modalController.create({
      component: PopUpTrackOrderComponent,
      cssClass: 'customModal',
      componentProps: {
        addressDestination: address,
        idSale: idSale
      },
    });
    return await modal.present();
  }

  async closePopUpProcessDelivery() {
    await this.modalController.dismiss(null);
  }
}
