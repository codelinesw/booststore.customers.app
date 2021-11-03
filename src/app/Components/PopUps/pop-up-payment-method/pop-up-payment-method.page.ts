import { Component, OnInit } from '@angular/core';
// import the utilities
import { Utilities } from "src/Utils/Utilities";

// import the models
import { ClientModel } from "src/app/Models/ClientModel";


// import the services


// import modal controller
import { ModalController, NavParams } from '@ionic/angular';

// import popUps
import { PopUpMapsComponent } from 'src/app/Components/PopUps/pop-up-maps/pop-up-maps.component';

@Component({
  selector: 'app-pop-up-payment-method',
  templateUrl: './pop-up-payment-method.page.html',
  styleUrls: ['./pop-up-payment-method.page.scss'],
})
export class PopUpPaymentMethodComponent implements OnInit {
  //Client: ClientModel = <ClientModel>{};
  //Shops: any[] = [];
  title: string = 'Pago con tarjeta de credito';
  paymentMethod: number = 1;
  metodos: any[] = ['prueba', 'artisan'];
  total: string = '0';
  amountToPay: string = '0';
  amountExchange: string = '0';
  orderType: number = 0;
  typeSale: number = 0;
  cuota: any = 0;
  paymentDateLimit: string = '0000-00:00 00:00:00';
  tableNumber: number = 0;
  idClassification: number = 1;
  salesAddress: string = 'sin dirección';

  constructor(
    public utils: Utilities,
    public modalController: ModalController,
    private navParams: NavParams
  ) {}

  async ionViewWillEnter() {
    this.title = this.navParams.data.title;
    this.paymentMethod = this.navParams.data.paymentMethod;
    this.total = this.navParams.data.total;
    this.typeSale = parseInt(this.navParams.data.typeSale);
    this.orderType = this.navParams.data.orderType;
    this.idClassification = this.navParams.data.idClassification;
    console.error('TOTAL :: ', this.total);
    console.warn(
      ' tipo de venta :: ',
      this.typeSale +
        ' Metodo de pago ' +
        this.paymentMethod +
        ' tipo orden :: ' +
        this.orderType
    );
  }

  ngOnInit() {}

  async save() {
    let error = false,
      message = '';

    if (!this.amountToPay || this.amountToPay.trim() === '') {
      error = true;
      message +=
        'Debes de ingresar el monto con el que esta pagando el cliente';
    }

    if (error) {
      this.utils.customAlert('Administración de clientes', message);
      return false;
    }

    this.navParams.data.makeSale(
      this.amountToPay,
      this.amountExchange,
      this.paymentDateLimit,
      this.tableNumber,
      this.salesAddress
    );
    // alert('Numero de mesa :: '+ this.tableNumber);
  }

  refresInformation($event) {
    console.log(
      'Valor ingresado :: ',
      parseInt($event.target.value) + ' -  total' + parseInt(this.total)
    );
    if ($event.target.value.trim() === '') {
      this.amountExchange = (0 - parseInt(this.total)).toString();
    } else {
      this.amountExchange = (
        parseInt($event.target.value) - parseInt(this.total)
      ).toString();
    }
  }
  async closePopUpPaymentMethod() {
    await this.modalController.dismiss(null);
  }
  setPaymentDateLimit($event) {
    console.log('Date choosed :: ', $event);
    let date = new Date($event.detail.value);
    this.paymentDateLimit = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  OnChangeCuota($event) {}

  async openMap() {
    const modal = await this.modalController.create({
      component: PopUpMapsComponent,
      cssClass: 'map-custom-modal',
      componentProps: {},
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data) {
          this.salesAddress = dataReturned.data;
        }
      }
    });

    return await modal.present();
  }
}
