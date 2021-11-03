import { Injectable } from '@angular/core';
import { HttpClient as Fetch } from 'src/app/HttpClient/';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import the models
import { OfficeModel } from 'src/app/Models/OfficeModel';
import { URL_BASE } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  private headerCustom: HttpHeaders;
  constructor(
    private fetch: Fetch,
    private httpClient: HttpClient,
  ) {}

  listOfficeByShop(office: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Office/listOfficeByShop`,
      JSON.stringify(office)
    );
  }

  listOfficeById(office: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Office/listOfficeById`,
      JSON.stringify(office)
    );
  }

  createOffice(office: OfficeModel) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Office/add`,
      JSON.stringify(office)
    );
  }

  updateOffice(office: OfficeModel) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Office/update`,
      JSON.stringify(office)
    );
  }

  deleteOffice(office: any) {
    return this.fetch.consumerPOST(
      `${URL_BASE}/Office/delete`,
      JSON.stringify(office)
    );
  }


  searchItems(body:any): Observable<any> {
    // this.headerCustom = new HttpHeaders(Headers:{ 'Content-Type': 'application/json'});
    return this.httpClient.post<OfficeModel[]>(`${URL_BASE}/Office/listOfficeByName`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }


}

