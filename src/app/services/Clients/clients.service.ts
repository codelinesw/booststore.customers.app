import { Injectable } from '@angular/core';
import { HttpClient as Fetch } from 'src/app/HttpClient/';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// import the utilities
import { Utilities } from "src/Utils/Utilities";

// import the models
import { ClientModel } from 'src/app/Models/ClientModel';
import { URL_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {

  private headerCustom: HttpHeaders;

  constructor(
    private fetch: Fetch,
    private httpClient: HttpClient,
    public utils: Utilities
  ) {}

  listClientByShop(shop: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Clients/listClientsByShop`,
      JSON.stringify(shop)
    );
  }

  createClient(client: ClientModel) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Clients/add`,
      JSON.stringify(client)
    );
  }

  updateClient(client: ClientModel) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Clients/update`,
      JSON.stringify(client)
    );
  }

  deleteClient(client: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Clients/deleteClientRShip`,
      JSON.stringify(client)
    );
  }

  listClientsByDocument(shop: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Clients/listClientsByDocument`,
      JSON.stringify(shop)
    );
  }

  listClientsByName(shop: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Clients/listClientsByName`,
      JSON.stringify(shop)
    );
  }

  listClientById(client: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Clients/listClientById`,
      JSON.stringify(client)
    );
  }

  searchItems(body: any): Observable<any> {
    // this.headerCustom = new HttpHeaders(Headers:{ 'Content-Type': 'application/json'});
    return this.httpClient.post<any[]>(
      `${URL_BASE}/Clients/searchClients`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
