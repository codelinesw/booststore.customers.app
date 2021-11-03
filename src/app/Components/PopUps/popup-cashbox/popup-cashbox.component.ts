import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, NavParams } from '@ionic/angular';

// import the utilities
import { Utilities } from "src/Utils/Utilities";

// import Models
import { UserModel } from "src/app/Models/UserModel";
import { OfficeModel } from 'src/app/Models/OfficeModel';

// import the services
import { UserService } from 'src/app/services/User/user.service';
import { CashboxService } from 'src/app/services/CashBox/cashbox.service';

@Component({
  selector: 'app-popup-cashbox',
  templateUrl: './popup-cashbox.component.html',
  styleUrls: ['./popup-cashbox.component.scss'],
})
export class PopupCashboxComponent implements OnInit {
  CashBox: any = {};
  responsables: any[] = [];
  expenses: any = [];
  sales: any = [];
  sIngredients: any = [];
  constructor(
    private utils: Utilities,
    private userService: UserService,
    private cashBoxS: CashboxService,
    private navParams: NavParams,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    try {
      if (this.utils.getSession()) {
        const { name, idShop } = await this.utils.getSession();
        // We get all the locations available for the store
        const requestUsers = await this.userService.listUsersByShop({
          idShop: idShop,
        });
        const responseRequestUsers = await requestUsers.json();
        console.log('Get all Users :: ', responseRequestUsers);
        this.responsables = responseRequestUsers;
      }
    } catch (error) {
      console.log('Error :: ', error);
    }
  }

  OnChangeResponsable($event) {
    this.CashBox.idStoreUser = $event.target.value;
  }

  async save() {
    let error = false,
      message = '';

    if (!this.CashBox.idStoreUser) {
      error = true;
      message =
        'Debes de seleccionar un responsable para la apertura de la caja';
    }

    if (!this.CashBox.initialTotal || this.CashBox.initialTotal <= 0) {
      error = true;
      message = 'Debes de ingresar un monto mayor a cero para abrir la caja';
    }

    if (error) {
      this.utils.customAlert('Apertura de caja', message);
    }

    try {
      const { name, idShop, idOffice } = await this.utils.getSession();
      this.utils.showLoading('Cargando...');
      const requestOpenCashBox = await this.cashBoxS.create({
        idShop: idShop,
        idOffice: idOffice,
        idStoreUser: this.CashBox.idStoreUser,
        machineUuid: this.CashBox.machineUuid,
        initialTotal: this.CashBox.initialTotal,
      });
      const reponseROCashBox = await requestOpenCashBox.json();
      console.log('Respuesta apertura de caja :: ', reponseROCashBox);
      this.utils.hideLoader();
      if (!reponseROCashBox.message) {
        console.log('Nav params :: ', this.navParams);
        await this.navParams.data.addItem(reponseROCashBox);
        this.utils.showToast(
          'Apertura de caja',
          'La apertura de la caja se ha realizo con existo',
          'SUCCESS'
        );
      }
    } catch (error) {
      this.utils.hideLoader();
      this.utils.showToast('Apertura de caja', error, 'FAILED');
    }
  }

  async closePop() {
    await this.modalController.dismiss(null);
  }
}
