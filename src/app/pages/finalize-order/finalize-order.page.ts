import { Component, OnInit, } from '@angular/core';
import { Platform } from "@ionic/angular";
// import the utilities
import { Utilities } from "src/Utils/Utilities";

// import the models
import { OfficeModel } from "src/app/Models/OfficeModel";
import { WarehouseModel } from 'src/app/Models/WarehouseModel';

// import the services
import { OfficeService } from "src/app/services/Office/office.service";
import { OrdersService } from 'src/app/services/Orders/orders.service';

@Component({
  selector: 'app-finalize-order',
  templateUrl: './finalize-order.page.html',
  styleUrls: ['./finalize-order.page.scss'],
})
export class FinalizeOrderPage implements OnInit {
  Offices: Array<OfficeModel> = [];
  Wharehouse: WarehouseModel = <WarehouseModel>{};
  products: Array<any> = [];
  loading: Array<any> = [1, 2, 3];
  loaded: boolean = false;
  subTotalAmount: string = '0';
  totalAmount: string = '0';
  deliveryCost: string = '5000';
  Departaments: Array<any> = [];
  Cities: Array<any> = [];
  FilteredCities: Array<any> = [];
  Order: any = {};
  paymentMethods: any[] = [
    {
      id: 2,
      image: 'assets/Icons/PaymentMethods/credit.png',
      name: 'Tarjeta de credito/debito',
      description: 'Visa, Mastercard y American Express',
    },
    {
      id: 3,
      image: 'assets/Icons/PaymentMethods/nequi.png',
      name: 'Nequi',
      description: 'Transacciones usando nequi',
    },
    {
      id: 1,
      image: 'assets/Icons/PaymentMethods/dollar-bills.png',
      name: 'Contra entrega',
      description: 'Pagas cuando recibes el pedido',
    },
  ];
  idPaymentMethod: number = 0;
  constructor(
    private officeService: OfficeService,
    public utils: Utilities,
    private ordersService: OrdersService,
    private platform: Platform
  ) {}

  ngOnInit() {}

  getPaymentMethods() {
    try {
      const { paymentMethod } = JSON.parse(
        localStorage.getItem('paymentMethod')
      );
      this.idPaymentMethod = paymentMethod;
      console.log('Metodo de pago de la tienda actual -> ', paymentMethod);
    } catch (error) {
      console.log('Error :: ', error);
    }
  }

  async ionViewWillEnter() {
    try {
      this.Order.idDep = 0;
      this.Order.idCity = 0;
      if (this.utils.getSession()) {
        const { idShop } = await this.utils.getSession();
      }
      this.products = this.utils.getProductsCart();
      this.getPaymentMethods();
      let total = 0,
        deliveryCost = parseInt(this.deliveryCost);
      for (let index = 0; index < this.products.length; index++) {
        total += parseInt(this.products[index].amountSale);
      }
      this.subTotalAmount = total.toString();
      this.totalAmount = (total + deliveryCost).toString();
      await this.getDepartments();
      await this.getCities();
    } catch (error) {}
  }

  setPaymentMethod(id: number) {}

  async save() {
    try {
      let error = false,
        message = '';
      // if (!this.Wharehouse.idOffice) {
      //   message +=
      //     '- Debes de seleccionar una sede a <BR>';
      //   error = true;
      // }

      if (!this.Wharehouse.code) {
        message +=
          '- Debes de ingresar un codigo para elmacen ya que nos sirve para identificar el almacen <BR>';
        error = true;
      }

      if (!this.Wharehouse.name) {
        message +=
          '- Debes de ingresar un nombre para elmacen ya que nos sirve para diferenciar el almacen <BR>';
        error = true;
      }

      if (error) {
        this.utils.customAlert('Creacion de almacenes', message);
        return false;
      }

      // this.utils.showLoading('Cargando...');
      // const requestCreateWarehouse = this.platform.getQueryParam('idWarehouse')
      //   ? await this.warehouseService.updateWarehouse(this.Wharehouse)
      //   : await this.warehouseService.createWarehouse(this.Wharehouse);
      // const responseRequestCreateWarehouse =
      //   await requestCreateWarehouse.json();
      // this.utils.hideLoader();
      // console.log(
      //   'Response create warehouse :: ',
      //   responseRequestCreateWarehouse
      // );

      // if (
      //   !this.platform.getQueryParam('idWarehouse') &&
      //   !responseRequestCreateWarehouse.message
      // ) {
      //   this.Wharehouse = <WarehouseModel>{};
      //   setTimeout(() => {
      //     this.utils.showToast(
      //       'Administracion de almacenes',
      //       'Se ha creado con exito el almacen',
      //       'SUCCESS'
      //     );
      //   }, 200);
      //   this.utils.goToPage('/warehouse');
      // }
      // if (
      //   this.platform.getQueryParam('idWarehouse') &&
      //   !responseRequestCreateWarehouse.message
      // ) {
      //   setTimeout(() => {
      //     this.utils.showToast(
      //       'Administracion de almacenes',
      //       'Se ha actualizado con exito el almacen',
      //       'SUCCESS'
      //     );
      //   }, 200);
      //   this.utils.goToPage('/warehouse');
      // }

      // if (responseRequestCreateWarehouse.message) {
      //   this.utils.showToast(
      //     'Administracion de almacenes',
      //     responseRequestCreateWarehouse.message,
      //     'ERROR'
      //   );
      // }
    } catch (error) {
      this.utils.hideLoader();
    }
  }

  OnChangeOffice($event) {}

  async authentication() {}

  async getDepartments() {
    // var requestOptions: any = {
    //   method: 'GET',
    //   headers: {
    //     Authorization: "Basic MDZkODkwNGY3YTdjNmZiNjBkOTRhNDY2YTdkYWZiMmFjODYyZTBkYzo="
    //   },
    //   redirect: 'follow'
    // };

    // fetch("https://logistica.epayco.io/api/departamentos", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
    const requestAllDeps = await this.ordersService.getDepartments();
    const responseRADeps = await requestAllDeps.json();
    console.log('Respuesta responseRADeps: ' + responseRADeps);
    if (!responseRADeps.message) {
      // let depts = responseRADeps.data;
      // for (const key in depts) {
      //   console.log(`${key}: ${depts[key]}`);
      //   this.Departaments.push(key);
      // }
      this.Departaments = responseRADeps;
    }
  }

  async getCities() {
    const requestAllCities = await this.ordersService.getCities();
    const responseRCities = await requestAllCities.json();
    console.log('Respuesta responseRCities: ' + responseRCities);
    if (!responseRCities.message) {
      this.Cities = responseRCities;
    }
  }

  OnChangeDep($event) {
    this.Order.idDep = $event.target.value;
    console.log("Deparamento seleccionado -> ", $event.target.value);
    this.Order.idCity = 0;
    this.FilteredCities = this.Cities.filter(
      (item) => item.idDepartment == $event.target.value
    );
  }

  OnChangeCity($event) {
    this.Order.idCity = $event.target.value;
  }

}
