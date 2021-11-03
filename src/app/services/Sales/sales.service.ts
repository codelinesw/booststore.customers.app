import { Injectable } from '@angular/core';
import { HttpClient } from 'src/app/HttpClient/';
// import the models
import { SalesModel } from 'src/app/Models/SalesModel';
import { URL_BASE } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private http: HttpClient) {}

  listSalesByShop(sales: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Sales/listSalesByShop`,
      JSON.stringify(sales)
    );
  }

  listSalesByOffice(product: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Sales/listSalesByOffice`,
      JSON.stringify(product)
    );
  }

  getTypesSale() {
    return this.http.consumerPOST(`${URL_BASE}/TypeSale/list`);
  }

  getOrderDetail(sale: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Sales/getOrderDetail`,
      JSON.stringify(sale)
    );
  }

  createSale(sale: SalesModel) {
    return this.http.consumerPOST(
      `${URL_BASE}/Sales/add`,
      JSON.stringify(sale)
    );
  }

  updateSale(sale: SalesModel) {
    return this.http.consumerPOST(
      `${URL_BASE}/Sales/update`,
      JSON.stringify(sale)
    );
  }
}
