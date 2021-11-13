import { Injectable } from "@angular/core";
import { HttpClient } from "src/app/HttpClient/";
// import the models
import { ShopModel } from "src/app/Models/ShopModel";
import { SessionModel } from "src/app/Models/SessionModel";
import { URL_BASE } from "src/environments/environment";
@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  getShopByClassification(shop: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Shop/getShopByClassification`,
      JSON.stringify(shop)
    );
  }

  getShopById(shop: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Shop/getShopById`,
      JSON.stringify(shop)
    );
  }

  register(shop: ShopModel) {
    return this.http.consumerPOST(`${URL_BASE}/Shop/add`, JSON.stringify(shop));
  }

  signIn(user: SessionModel) {
    return this.http.consumerPOST(
      `${URL_BASE}/SignIn/access`,
      JSON.stringify(user)
    );
  }

  update(shop: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Shop/update`,
      JSON.stringify(shop)
    );
  }
}
