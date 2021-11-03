import { Injectable } from '@angular/core';
import { HttpClient } from 'src/app/HttpClient/';

// import the models
import { IngredientsModel } from 'src/app/Models/IngredientsModel';
import { URL_BASE } from 'src/environments/environment';

import { InventoryModel } from 'src/app/Models/InventoryModel';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  constructor(private http: HttpClient) {}

  listUnitsByShop(product: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Units/listUnitsByShop`,
      JSON.stringify(product)
    );
  }

  listUnitsById(product: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Units/listUnitById`,
      JSON.stringify(product)
    );
  }

  create(product: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Units/add`,
      JSON.stringify(product)
    );
  }

  update(product: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Units/update`,
      JSON.stringify(product)
    );
  }

  delete(product: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Units/delete`,
      JSON.stringify(product)
    );
  }
}
