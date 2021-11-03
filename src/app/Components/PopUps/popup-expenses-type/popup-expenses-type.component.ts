import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

// import the utilities
import { Utilities } from "src/Utils/Utilities";


// import the services

import { ExpensesService } from "src/app/services/Expenses/expenses.service";

@Component({
  selector: 'app-popup-expenses-type',
  templateUrl: './popup-expenses-type.component.html',
  styleUrls: ['./popup-expenses-type.component.scss'],
})
export class PopupExpensesTypeComponent implements OnInit {
  ExpensesType: any = {};
  idExpenseType: number = 0;
  constructor(
    private utils: Utilities,
    private navParams: NavParams,
    private expensesS: ExpensesService
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.idExpenseType = await this.navParams.data.idExpenseType;
    this.ExpensesType.name = await this.navParams.data.name;
  }

  async save() {
    let error = false,
      message = '';

    console.log('Expenses Type :: ', this.ExpensesType);
    if (!this.ExpensesType.name) {
      error = true;
      message = 'Debes de ingresar un nombre para el nuevo tipo de gasto';
    }

    if (error) {
      this.utils.customAlert('Tipo de Gasto', message);
      return null;
    }

    try {
      const { name, idShop, idOffice } = await this.utils.getSession();
      this.utils.showLoading('Cargando...');
      const requestExpensesType =
        this.idExpenseType > 0
          ? await this.expensesS.updateExpensesType({
              idExpenseType: this.idExpenseType,
              name: this.ExpensesType.name,
            })
          : await this.expensesS.createExpensesType({
              idShop: idShop,
              idOffice: idOffice,
              name: this.ExpensesType.name,
            });
      const reponsExpensesType = await requestExpensesType.json();
      console.log('Respuesta apertura de caja :: ', reponsExpensesType);
      this.utils.hideLoader();
      if (!reponsExpensesType.message) {
        console.log('Nav params :: ', this.navParams);
        if (this.idExpenseType > 0) {
          await this.navParams.data.replaceItem(reponsExpensesType);
        } else {
          await this.navParams.data.addItem(reponsExpensesType);
        }
        this.utils.showToast(
          'Tipos de gastos',
          this.idExpenseType > 0
            ? 'El tipo de gasto se modificó con exito'
            : 'El tipo de gasto de creo con exito',
          'SUCCESS'
        );
      } else {
        this.utils.showToast(
          'Tipos de gastos',
          reponsExpensesType.message,
          'FAILED'
        );
      }
    } catch (error) {
      this.utils.hideLoader();
      this.utils.showToast('Apertura de caja', error, 'FAILED');
    }
  }

  async closePopUp() {
    //await this.modalController.dismiss(null);
  }
}
