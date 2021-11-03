import { Injectable } from '@angular/core';
import { HttpClient } from 'src/app/HttpClient/';
// import the models
import { ProductModel } from 'src/app/Models/ProductModel';
import { URL_BASE } from 'src/environments/environment';

import { InventoryModel } from 'src/app/Models/InventoryModel';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  listProductsByShop(product: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Inventory/listProductsByShop`,
      JSON.stringify(product)
    );
  }

  listProductsByOffice(product: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Inventory/listProductsByOffice`,
      JSON.stringify(product)
    );
  }

  listProductById(product: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Inventory/listProductById`,
      JSON.stringify(product)
    );
  }

  createInventory(Inventory: InventoryModel) {
    return this.http.consumerPOST(
      `${URL_BASE}/Inventory/add`,
      JSON.stringify(Inventory)
    );
  }

  updateInventory(Inventory: InventoryModel) {
    return this.http.consumerPOST(
      `${URL_BASE}/Inventory/update`,
      JSON.stringify(Inventory)
    );
  }

}
