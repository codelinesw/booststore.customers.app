import { Injectable } from '@angular/core';
import { HttpClient as Fetch } from 'src/app/HttpClient/';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import the models
import { ProductModel } from "src/app/Models/ProductModel";
import { URL_BASE } from "src/environments/environment";
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private headerCustom: HttpHeaders;
  constructor(private fetch: Fetch, private httpClient: HttpClient) {}

  getProductsByCategories(product: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Products/listProductsByCategories`,
      JSON.stringify(product)
    );
  }

  listProductsByShop(product: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Products/listProductsByShop`,
      JSON.stringify(product)
    );
  }

  listProductsByOffice(product: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Products/listProductsByOffice`,
      JSON.stringify(product)
    );
  }

  listProductById(product: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Products/listProductById`,
      JSON.stringify(product)
    );
  }

  createProduct(product: ProductModel) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Products/add`,
      JSON.stringify(product)
    );
  }

  updateProduct(product: ProductModel) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Products/update`,
      JSON.stringify(product)
    );
  }

  generateQR(product: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Products/generateQR`,
      JSON.stringify(product)
    );
  }

  generateBarCode(product: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Products/generateBarCode`,
      JSON.stringify(product)
    );
  }

  searchProductByQR(product: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Products/searchProduct`,
      JSON.stringify(product)
    );
  }

  deleteFile(product: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Products/deleteFile`,
      JSON.stringify(product)
    );
  }

  searchItems(body: any) {
    return this.httpClient.post<any[]>(
      `${URL_BASE}/Products/searchProduct`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
