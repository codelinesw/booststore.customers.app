import { Injectable } from '@angular/core';
import { HttpClient } from 'src/app/HttpClient/';
// import the models
import { WarehouseModel } from 'src/app/Models/WarehouseModel';
import { URL_BASE } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  constructor(private http: HttpClient) {}
  listWarehousesById(warehouse: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Warehouse/listWarehouseById`,
      JSON.stringify(warehouse)
    );
  }
  listWarehousesByShop(warehouse: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Warehouse/listWarehouseByShop`,
      JSON.stringify(warehouse)
    );
  }
  listWarehousesByOffice(warehouse: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Warehouse/listWarehouseByOffice`,
      JSON.stringify(warehouse)
    );
  }
  createWarehouse(warehouse: WarehouseModel) {
    return this.http.consumerPOST(
      `${URL_BASE}/Warehouse/add`,
      JSON.stringify(warehouse)
    );
  }
  updateWarehouse(warehouse: WarehouseModel) {
    return this.http.consumerPOST(
      `${URL_BASE}/Warehouse/update`,
      JSON.stringify(warehouse)
    );
  }
  deleteWarehouse(warehouse: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Warehouse/delete`,
      JSON.stringify(warehouse)
    );
  }
}
