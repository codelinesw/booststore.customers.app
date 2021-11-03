import { Injectable } from '@angular/core';
import { HttpClient } from 'src/app/HttpClient/';
// import the models
import { ProductModel } from 'src/app/Models/ProductModel';
import { URL_BASE } from 'src/environments/environment';

import { HomeDeliveryModel } from 'src/app/Models/HomeDeliveryModel';

@Injectable({
  providedIn: 'root',
})
export class HomeDeliveryService {
  constructor(private http: HttpClient) {}

  listHomeDeliveryByShop(HomeDelivery: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/HomeDelivery/listHomeDeliveryByShop`,
      JSON.stringify(HomeDelivery)
    );
  }

  listHomeDeliveryByOffice(HomeDelivery: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/HomeDelivery/listHomeDeliveryByOffice`,
      JSON.stringify(HomeDelivery)
    );
  }

  listHomeDeliveryByEmployee(HomeDelivery: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/HomeDelivery/listHomeDeliveryByEmployee`,
      JSON.stringify(HomeDelivery)
    );
  }

  createHomeDelivery(HomeDelivery: HomeDeliveryModel) {
    return this.http.consumerPOST(
      `${URL_BASE}/HomeDelivery/add`,
      JSON.stringify(HomeDelivery)
    );
  }

  updateHomeDelivery(HomeDelivery: HomeDeliveryModel) {
    return this.http.consumerPOST(
      `${URL_BASE}/HomeDelivery/update`,
      JSON.stringify(HomeDelivery)
    );
  }

  updateHomeDeliveryState(HomeDelivery: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/HomeDelivery/updateState`,
      JSON.stringify(HomeDelivery)
    );
  }


}
