import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

// import the utilities
import { Utilities } from "src/Utils/Utilities";

// import Models
import { UserModel } from "src/app/Models/UserModel";
import { OfficeModel } from 'src/app/Models/OfficeModel';

// import the services
import { UserService } from 'src/app/services/User/user.service';
import { ExpensesService } from 'src/app/services/Expenses/expenses.service';

@Component({
  selector: 'app-popup-expenses',
  templateUrl: './popup-expenses.component.html',
  styleUrls: ['./popup-expenses.component.scss'],
})
export class PopupExpensesComponent implements OnInit {
  users: UserModel[] = [];
  expensesType: any[] = [];
  expenses: any = {};
  idExpense: number = 0;
  constructor(
    private utils: Utilities,
    private userService: UserService,
    private expensesS: ExpensesService,
    private navParams: NavParams,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    try {
      if (this.utils.getSession()) {
        const { idShop, idOffice } = this.utils.getSession();
        this.utils.showLoading('Cargando...');
        const requestUsers = await this.userService.listUsersByOffice({
          idShop: idShop,
          idOffice: idOffice,
        });
        const responseRUsers = await requestUsers.json();
        console.log(' Responsables :: ', responseRUsers);
        this.utils.hideLoader();
        if (!responseRUsers.message) {
          this.users = responseRUsers;
        }

        const requestCashBox = await this.expensesS.listExpensesTypeByOffice({
          idShop: idShop,
          idOffice: idOffice,
        });
        const responseRequestCashBox = await requestCashBox.json();
        console.log('Get all ExpensesType :: ', responseRequestCashBox);
        this.expensesType = responseRequestCashBox;

        if (this.navParams.data.idExpense) {
          this.expenses = this.navParams.data.info;
        }
      }
    } catch (error) {
      this.utils.hideLoader();
    }
  }

  OnChangeUser($event) {
    let find = this.users.find(
      (item) => item.idStoreUser == parseInt($event.target.value)
    );
    console.log('Responsable encontrado ', find);
    this.expenses.idResponsable = $event.target.value;
    this.expenses.responsable = find ? find.username : '';
  }

  OnChangeExpenseType($event) {
    console.log('Tipo de gasto :: ', $event.target.value);
    let find = this.expensesType.find(
      (item) => item.idExpenseType == parseInt($event.target.value)
    );
    console.log('Tipo de gasto encontrado ', find);
    this.expenses.expenseName = find ? find.name : '';
    this.expenses.idExpenseType = $event.target.value;
  }

  OnChangePaymentMethod($event) {
    console.log('Metodo de pago :: ', $event);
    this.expenses.paymentMethod = $event.target.value;
  }

  async save() {
    let error = false,
      message = '';

    console.log('Expenses Type :: ', this.expenses);
    if (!this.expenses.idExpenseType) {
      error = true;
      message = 'Debes de seleccionar el tipo de gasto';
    }

    if (!this.expenses.idResponsable) {
      error = true;
      message = 'Debes de seleccionar quien es el responsable del gasto';
    }

    if (!this.expenses.paymentMethod) {
      error = true;
      message = 'Debes de seleccionar el metodo de pago del gasto';
    }

    if (!this.expenses.expenseConcept) {
      error = true;
      message =
        'Debes de ingresar un concepto(En que se hizo el gasto) se requiere este dato del gasto para poder crear';
    }

    if (!this.expenses.subTotal) {
      error = true;
      message =
        'Debes de ingresar un subTotal(El monto del gasto) se requiere este dato del gasto para poder crear';
    }

    if (error) {
      this.utils.customAlert('Tipo de Gasto', message);
      return null;
    }

    try {
      const { name, idShop, idOffice, username } =
        await this.utils.getSession();
      this.expenses.idShop = idShop;
      this.expenses.idOffice = idOffice;
      this.utils.showLoading('Cargando...');
      const requestExpenses =
        this.idExpense > 0
          ? await this.expensesS.update({
              ...this.expenses,
              idExpense: this.idExpense,
            })
          : await this.expensesS.create(this.expenses);
      const responseExpenses = await requestExpenses.json();
      console.log('Respuesta apertura de caja :: ', responseExpenses);
      this.utils.hideLoader();
      if (!responseExpenses.message) {
        console.log('Nav params :: ', this.navParams);
        if (this.idExpense > 0) {
          await this.navParams.data.replaceItem({
            ...responseExpenses,
            username: username,
          });
        } else {
          await this.navParams.data.addItem({
            ...responseExpenses,
            username: username,
          });
        }
        this.utils.showToast(
          'Gastos',
          this.idExpense > 0
            ? 'El gasto se modificó con exito'
            : 'El gasto se creo con exito',
          'SUCCESS'
        );
      } else {
        this.utils.showToast(
          'Tipos de gastos',
          responseExpenses.message,
          'FAILED'
        );
      }
    } catch (error) {
      this.utils.hideLoader();
      this.utils.showToast('Apertura de caja', error, 'FAILED');
    }
  }

  async closePopUp() {
    await this.modalController.dismiss(null);
  }
}
