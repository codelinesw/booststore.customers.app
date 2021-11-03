import { Injectable } from '@angular/core';
import { HttpClient } from 'src/app/HttpClient/';
// import the models
import { WarehouseSupplyModel } from 'src/app/Models/WarehouseSupplyModel';
import { URL_BASE } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class WarehouseSupplyService {
  constructor(private http: HttpClient) {}
  listWarehouseSupplyById(warehouseSupply: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/WarehouseSupply/listWarehouseSupplyById`,
      JSON.stringify(warehouseSupply)
    );
  }
  listWarehouseSupplyByShop(warehouseSupply: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/WarehouseSupply/listWarehouseSupplyByShop`,
      JSON.stringify(warehouseSupply)
    );
  }
  listWarehouseSupplyByOffice(warehouseSupply: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/WarehouseSupply/listWarehouseSupplyByOffice`,
      JSON.stringify(warehouseSupply)
    );
  }
  
  add(warehouseSupply: WarehouseSupplyModel) {
    return this.http.consumerPOST(
      `${URL_BASE}/WarehouseSupply/add`,
      JSON.stringify(warehouseSupply)
    );
  }

  updateWarehouseSupply(warehouse: WarehouseSupplyModel) {
    return this.http.consumerPOST(
      `${URL_BASE}/WarehouseSupply/update`,
      JSON.stringify(warehouse)
    );
  }

  deleteWarehouseSupply(warehouse: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/WarehouseSupply/delete`,
      JSON.stringify(warehouse)
    );
  }

}
