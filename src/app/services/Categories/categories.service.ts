import { Injectable } from '@angular/core';
import { HttpClient as Fetch } from 'src/app/HttpClient/';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import the models
import { CategoryModel } from "src/app/Models/CategoryModel";
import { URL_BASE } from "src/environments/environment";
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  private headerCustom: HttpHeaders;
  constructor(private fetch: Fetch, private httpClient: HttpClient) {}

  createCategory(category: CategoryModel) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Categories/add`,
      JSON.stringify(category)
    );
  }

  updateCategory(category: CategoryModel) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Categories/update`,
      JSON.stringify(category)
    );
  }

  deleteCategory(category: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Categories/delete`,
      JSON.stringify(category)
    );
  }

  listCategoriesByShop(category: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Categories/listCategoriesByShop`,
      JSON.stringify(category)
    );
  }

  listCategoriesByOffice(category: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Categories/listCategoriesByOffice`,
      JSON.stringify(category)
    );
  }

  listCategoryById(category: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Categories/listCategoriesById`,
      JSON.stringify(category)
    );
  }

  searchItems(body: any): Observable<any> {
    // this.headerCustom = new HttpHeaders(Headers:{ 'Content-Type': 'application/json'});
    return this.httpClient.post<CategoryModel[]>(
      `${URL_BASE}/Categories/listCategoriesByName`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
