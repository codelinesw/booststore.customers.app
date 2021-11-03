import { Injectable } from '@angular/core';
import { URL_BASE } from 'src/environments/environment';
import { HttpClient } from 'src/app/HttpClient/';
import { Utilities } from 'src/Utils/Utilities';
import { SuppliersModel } from 'src/app/Models/SuppliersModel';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(private http: HttpClient, private utils: Utilities) {}

  createSupplier(supplier: SuppliersModel) {
    return this.http.consumerPOST(`${URL_BASE}/Suppliers/add`,
      JSON.stringify(supplier));
  }

  updateSupplier(supplier: SuppliersModel) {
    return this.http.consumerPOST(`${URL_BASE}/Suppliers/update`,JSON.stringify(supplier));
  }

  deleteSupplier(supplier: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Suppliers/delete`,
      JSON.stringify(supplier)
    );
  }

  listSuppliersByShop(shop: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Suppliers/listSuppliersByShop`,
      JSON.stringify(shop)
    );
  }

  listSuppliersByOffice(shop: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Suppliers/listSuppliersByOffice`,
      JSON.stringify(shop)
    );
  }

  searchSupplier(shop: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Suppliers/searchSupplier`,
      JSON.stringify(shop)
    );
  }

  listSuppliersById(idSupplier: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Suppliers/listSuppliersById`,
      JSON.stringify(idSupplier)
    );
  }
}
