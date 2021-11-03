import { Injectable } from '@angular/core';
import { HttpClient } from 'src/app/HttpClient/';
// import the models
import { ProductModel } from 'src/app/Models/ProductModel';
import { URL_BASE } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PaymentMethodService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.consumerPOST(`${URL_BASE}/PaymentMethod/list`);
  }

  listPaymentMethodByShop() {
    return this.http.consumerPOST(`${URL_BASE}/PaymentMethod/list`);
  }

  listPaymentMethodByOffice(paymentMethod: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/PaymentMethod/list/PaymentMethodByOffice`,
      JSON.stringify(paymentMethod)
    );
  }

  addPaymentMethod(paymentMethod: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/PaymentMethod/add`,
      JSON.stringify(paymentMethod)
    );
  }
}
