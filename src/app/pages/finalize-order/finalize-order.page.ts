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
import { SalesService } from 'src/app/services/Sales/sales.service';

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
  OrderType: Array<any> = [
    {
      idOrderType: 1,
      name: 'Domicilio',
    },
    {
      idOrderType: 3,
      name: 'Retiro en el punto de venta',
    },
  ];
  constructor(
    private officeService: OfficeService,
    public utils: Utilities,
    private ordersService: OrdersService,
    private platform: Platform,
    private salesService: SalesService
  ) {}

  ngOnInit() {}

  getPaymentInfo() {
    try {
      return JSON.parse(localStorage.getItem('paymentInfo'));
    } catch (error) {
      console.log('Error :: ', error);
    }
  }

  getPaymentMethods() {
    const { idPaymentMethod } = this.getPaymentInfo();
    this.idPaymentMethod = idPaymentMethod;
    console.log('Metodo de pago de la tienda actual -> ', idPaymentMethod);
  }

  async ionViewWillEnter() {
    try {
      this.Order.idDep = 0;
      this.Order.idCity = 0;
      this.Order.idOrderType = 0;
      if (this.utils.getSession()) {
        const { idShop } = await this.utils.getSession();
      }
      this.products = this.utils.getProductsCart();
      this.getPaymentMethods();
      let total = 0,
        deliveryCost = parseInt(this.deliveryCost),
        totalDiscount = 0,
        totalQty = 0,
        products = [];
      for (let index = 0; index < this.products.length; index++) {
        total += parseInt(this.products[index].amountSale);
        totalQty += parseInt(this.products[index].qty);
        totalDiscount += parseInt(this.products[index].discount);
      }
      this.subTotalAmount = total.toString();
      this.totalAmount = (total + deliveryCost).toString();
      this.Order.amountSale = this.totalAmount;
      this.Order.amountPaid = this.totalAmount;
      this.Order.amountExchange = 0;
      this.Order.qtySold = totalQty;
      this.Order.discount = totalDiscount;
      this.Order.balance = 0;
      this.Order.products = JSON.stringify(this.products);
      await this.getDepartments();
      await this.getCities();
    } catch (error) {}
  }

  setPaymentMethod(id: number) {}

  OnChangeOrderType($event) {
    this.Order.idOrderType = $event.target.value;
  }

  validateFields() {
    let error = false,
      message = '';

    if (
      !this.Order.name ||
      (this.Order.name && this.Order.name.trim().length === 0)
    ) {
      message +=
        '- Debes de ingresa el Nombre de la persona que realiza el domicilio <BR>';
      error = true;
    }

    if (
      !this.Order.lastName ||
      (this.Order.lastName && this.Order.lastName.trim().length === 0)
    ) {
      message +=
        '- Debes de ingresa el Apellido de la persona que realiza el domicilio <BR>';
      error = true;
    }

    if (
      !this.Order.cellPhoneNumber ||
      (this.Order.cellPhoneNumber &&
        this.Order.cellPhoneNumber.trim().length === 0)
    ) {
      message +=
        '- Debes de ingresa el número celular de la persona que realiza el domicilio <BR>';
      error = true;
    }

    if (
      !this.Order.document ||
      (this.Order.document && this.Order.document.trim().length === 0)
    ) {
      message +=
        '- Debes de ingresa el documento de identificación de la persona que realiza el domicilio <BR>';
      error = true;
    }

    if (
      !this.Order.email ||
      (this.Order.email && this.Order.email.trim().length === 0)
    ) {
      message +=
        '- Debes de ingresa el correo de la persona que realiza el domicilio <BR>';
      error = true;
    }

    if (!this.Order.idDep || this.Order.idDep == 0) {
      message +=
        '- Debes de seleccionar a que departamento se va despachar el pedido <BR>';
      error = true;
    }

    if (!this.Order.idCity || this.Order.idCity == 0) {
      message += '- Debes de seleccionar a que ciudad se va despachar el pedido <BR>';
      error = true;
    }

    if (
      !this.Order.address ||
      (this.Order.address && this.Order.address.trim().length === 0)
    ) {
      message += '- Debes de ingresa la dirección donde se va entregar el pedido <BR>';
      error = true;
    }

    if (
      !this.Order.numOne ||
      (this.Order.numOne && this.Order.numOne.trim().length === 0)
    ) {
      message +=
        '- Debes de completar la dirección(Te hace falta el primer numero EJ 32) donde se va entregar el pedido <BR>';
      error = true;
    }

    if (
      !this.Order.numTwo ||
      (this.Order.numTwo && this.Order.numTwo.trim().length === 0)
    ) {
      message +=
        '- Debes de completar la dirección(Te hace falta el segundo numero EJ 32) donde se va entregar el pedido <BR>';
      error = true;
    }

    if (error) {
      this.utils.customAlert('Finalizar pedido', message);
      return true;
    }

    return false;
  }

  async save() {
    try {
      if (!this.validateFields()) {
        const paymentInfo = this.getPaymentInfo();
        this.Order.idShop = paymentInfo.idShop;
        this.Order.idOffice = paymentInfo.idOffice;
        this.Order.idWarehouse = paymentInfo.idWarehouse;
        this.Order.idPaymentMethod = this.idPaymentMethod;
        this.Order.idTypeSale = 2;
        this.Order.salesAddress = `${this.Order.address}. #${this.Order.numOne}-${this.Order.numTwo},${this.Order.city},${this.Order.department}, Colombia`;
        this.Order.idClassification = paymentInfo.idClassification;
        this.Order.paymentDateLimit = '0000-00:00 00:00:00';
        this.Order.tableNumber = 0;
        this.utils.showLoading('Cargando...');
        const requestCOrder = await this.salesService.createSale(this.Order);
        const responseRequestCOrder = await requestCOrder.json();
        this.utils.hideLoader();
        console.log('Response create order :: ', responseRequestCOrder);

        if (!responseRequestCOrder.message) {
          this.Order = <any>{};
          this.utils.showToast(
            'Finalizar pedido',
            'Se ha realizo el pedido con exito',
            'SUCCESS'
          );
        } else {
          this.utils.showToast(
            'Finalizar pedido',
            responseRequestCOrder.message,
            'ERROR'
          );
        }
      }
    } catch (error) {
      this.utils.hideLoader();
      console.log('Error -> ', error);
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
    console.log('Deparamento seleccionado -> ', $event.target.value);
    this.Order.idCity = 0;
    if (this.Cities.length > 0 && this.Departaments.length > 0) {
      this.FilteredCities = this.Cities.filter(
        (item) => item.idDepartment == $event.target.value
      );
      this.Order.department = this.Departaments.find(
        (item) => item.idDepartment == this.Order.idDep
      ).name;
    }
  }

  OnChangeCity($event) {
    this.Order.idCity = $event.target.value;
    if (this.FilteredCities.length > 0) {
      this.Order.city = this.FilteredCities.find(
        (item) => item.idCity == this.Order.idCity
      ).name;
    }
  }
}
