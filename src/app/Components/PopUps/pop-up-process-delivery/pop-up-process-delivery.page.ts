import { Component, OnInit } from '@angular/core';
// import the utilities
import { Utilities } from "src/Utils/Utilities";

// import the models
import { ClientModel } from "src/app/Models/ClientModel";


// import the services


// import modal controller
import { ModalController, NavParams } from '@ionic/angular';

// import the services
import { UserService } from 'src/app/services/User/user.service';
import { HomeDeliveryService } from 'src/app/services/HomeDelivery/home-delivery.service';
import { HomeDeliveryModel } from 'src/app/Models/HomeDeliveryModel';

@Component({
  selector: 'app-pop-up-process-delivery',
  templateUrl: './pop-up-process-delivery.page.html',
  styleUrls: ['./pop-up-process-delivery.page.scss'],
})
export class PopUpProcessDeliveryComponent implements OnInit {
  Deliverers: any[] = ['prueba', 'artisan'];
  idClassification: number = 1;
  deliveryType: any = 1;
  HomeDelivery: HomeDeliveryModel = <HomeDeliveryModel>{};
  currentState: string;
  constructor(
    public utils: Utilities,
    public modalController: ModalController,
    private navParams: NavParams,
    private userService: UserService,
    private homeDeliveryService: HomeDeliveryService,
  ) {}

  async ionViewWillEnter() {
    try {
      if (this.utils.getSession()) {
        const { name, idShop, idOffice, idStoreUser } = await this.utils.getSession();
        // We get all the locations available for the store
        const requestDeliverers = await this.userService.listDeliverersByShop({
          idShop: idShop
        });
        const responseRequestDeliverers = await requestDeliverers.json();
        console.log('Get all Deliverers :: ', responseRequestDeliverers);
        this.Deliverers = responseRequestDeliverers;
        this.HomeDelivery.idShop = idShop;
        this.HomeDelivery.idOffice = idOffice;
        this.HomeDelivery.idStoreUser = idStoreUser;
        this.HomeDelivery.idClient = this.navParams.data.idClient;
        this.HomeDelivery.idSale = this.navParams.data.idSale;
        this.HomeDelivery.pickupLocation = this.navParams.data.salesAddress;
        console.log('id Client :: ', this.HomeDelivery);
      }
    } catch (error) {}
  }

  OnChangeDeliveryMan($event){
    this.HomeDelivery.idStoreUser = $event.detail.value;
    console.log("HomeDelivery :: ", this.HomeDelivery);
  }

  ngOnInit() {}

  OnChangeDeliveryType($event) {
    console.log('Opcion seleccionada :: ', $event.detail.value);
    this.deliveryType = $event.detail.value;
  }

  async save() {
    let error = false,
      message = '';

    if (
      this.deliveryType === 2 &&
      (!this.HomeDelivery.idStoreUser)
    ) {
      error = true;
      message +=
        'Debes de seleccionar con que domiciliario vas a despachar la orden';
    }

    if (error) {
      this.utils.customAlert('Administración de clientes', message);
      return false;
    }

    try {      
      this.HomeDelivery.latitudeLocation = this.utils.getLatitude().toString();
      this.HomeDelivery.longitudeLocation = this.utils.getLongitude().toString();
      this.HomeDelivery.deliveryTimeCalculation = "90";      
      this.utils.showLoading("cargando...");
      const requestHomeDelivery = await this.homeDeliveryService.createHomeDelivery(this.HomeDelivery);
      const responseRHomeDelivery: any = requestHomeDelivery.json();
      this.utils.hideLoader();
      if (!responseRHomeDelivery.message) {
        this.closePopUpPaymentMethod();
        setTimeout(() => {
          this.utils.showToast(
            'Administración de usuarios',
            'Se ha asignado correctamente el domicilio',
            'SUCCESS'
          );
        }, 200);
        this.utils.goToPage('/home-delivery');
      } else {
        this.utils.showToast(
          'Administración de usuarios',
          responseRHomeDelivery.message,
          'ERROR'
        );
      }
    } catch (error) {
      this.utils.hideLoader();
      this.utils.showToast(
        'Administración de usuarios',
        error,
        'ERROR'
      );
    }

  }

  async closePopUpPaymentMethod() {
    await this.modalController.dismiss(null);
  }
}
