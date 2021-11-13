import { Injectable } from '@angular/core';
import { HttpClient as Fetch } from 'src/app/HttpClient/';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import the models
import { ProductModel } from 'src/app/Models/ProductModel';
import { URL_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private headerCustom: HttpHeaders;
  constructor(private fetch: Fetch, private httpClient: HttpClient) {}

  // getDepartments() {
  //   return this.fetch.consumerPOST(
  //     `https://logistica.epayco.io/api/ciudades/agrupado`
  //   );
  // }

  getDepartments() {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Departments/list`
    );
  }

  getCities() {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Cities/list`
    );
  }

}
