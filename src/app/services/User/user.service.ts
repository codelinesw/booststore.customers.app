import { Injectable } from '@angular/core';
import { HttpClient as Fetch } from 'src/app/HttpClient/';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import the models
import { UserModel } from 'src/app/Models/UserModel';
import { URL_BASE } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private headerCustom: HttpHeaders;
  constructor(private fetch: Fetch, private httpClient: HttpClient) {}

  create(userRegister: UserModel) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/StoreUsers/add`,
      JSON.stringify(userRegister)
    );
  }

  update(userRegister: UserModel) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/StoreUsers/update`,
      JSON.stringify(userRegister)
    );
  }

  delete(userRegister: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/StoreUsers/delete`,
      JSON.stringify(userRegister)
    );
  }

  listUsersByShop(condition: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/StoreUsers/listUserByShop`,
      JSON.stringify(condition)
    );
  }

  listUsersByOffice(condition: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/StoreUsers/listUserByOffice`,
      JSON.stringify(condition)
    );
  }

  listDeliverersByShop(condition: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/StoreUsers/listDeliverersByShop`,
      JSON.stringify(condition)
    );
  }

  listDeliverersByName(condition: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/StoreUsers/listDeliverersByName`,
      JSON.stringify(condition)
    );
  }

  listUserById(condition: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/StoreUsers/listStoreUserById`,
      JSON.stringify(condition)
    );
  }

  restore(info: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/RestorePassword/restore`,
      JSON.stringify(info)
    );
  }

  changePassword(info: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/RestorePassword/changePassword`,
      JSON.stringify(info)
    );
  }

  searchItems(body: any): Observable<any> {
    // this.headerCustom = new HttpHeaders(Headers:{ 'Content-Type': 'application/json'});
    return this.httpClient.post<any[]>(
      `${URL_BASE}/StoreUsers/searchStoreUser`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
