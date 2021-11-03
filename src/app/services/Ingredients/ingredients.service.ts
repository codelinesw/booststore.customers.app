import { Injectable } from '@angular/core';
import { HttpClient } from 'src/app/HttpClient/';
// import the models
import { IngredientsModel } from 'src/app/Models/IngredientsModel';
import { URL_BASE } from 'src/environments/environment';

import { InventoryModel } from 'src/app/Models/InventoryModel';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  constructor(private http: HttpClient) {}

  listIngredientsByShop(product: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Ingredients/listIngredientsByShop`,
      JSON.stringify(product)
    );
  }

  listIngredientsById(product: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Ingredients/listIngredientById`,
      JSON.stringify(product)
    );
  }

  create(product: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Ingredients/add`,
      JSON.stringify(product)
    );
  }

  update(product: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Ingredients/update`,
      JSON.stringify(product)
    );
  }

  delete(product: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Ingredients/delete`,
      JSON.stringify(product)
    );
  }

  listIngredientsByOffice ( ingredient: any ) {
    return this.http.consumerPOST(
      `${URL_BASE}/Ingredients/listIngredientsByOffice`,
      JSON.stringify(ingredient)
    );
  }

}
