import { Injectable } from '@angular/core';
import { HttpClient } from 'src/app/HttpClient/';
// import the models
import { CategoryModel } from 'src/app/Models/CategoryModel';
import { URL_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CashboxService {
  constructor(private http: HttpClient) {}

  create(cashBox: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/CashBox/add`,
      JSON.stringify(cashBox)
    );
  }

  update(cashBox: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/CashBox/update`,
      JSON.stringify(cashBox)
    );
  }

  delete(cashBox: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/CashBox/delete`,
      JSON.stringify(cashBox)
    );
  }

  listCashBoxByShop(cashBox: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/CashBox/listCashBoxByShop`,
      JSON.stringify(cashBox)
    );
  }

  listCashBoxByOffice(cashBox: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/CashBox/listCashBoxByOffice`,
      JSON.stringify(cashBox)
    );
  }

  listCategoryById(cashBox: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/CashBox/listCashBoxById`,
      JSON.stringify(cashBox)
    );
  }
}
