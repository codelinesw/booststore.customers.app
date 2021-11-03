import { Injectable } from '@angular/core';
import { HttpClient } from 'src/app/HttpClient/';

// import the models
import { URL_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndicatorsService {
  constructor(private http: HttpClient) {}

  getOrders(indicator: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Indicators/getOrders`,
      JSON.stringify(indicator)
    );
  }

  getSalesByHours(indicator: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Indicators/getSalesByHours`,
      JSON.stringify(indicator)
    );
  }

  getSalesByDay(indicator: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Indicators/getSalesByDay`,
      JSON.stringify(indicator)
    );
  }

  getSalesByMonth(indicator: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Indicators/getSalesByMonth`,
      JSON.stringify(indicator)
    );
  }

  getSalesByYear(indicator: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Indicators/getSalesByYear`,
      JSON.stringify(indicator)
    );
  }

  getComparativeByDay(indicator: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Indicators/getComparativeByDay`,
      JSON.stringify(indicator)
    );
  }

  getComparativeByMonth(indicator: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Indicators/getComparativeByMonth`,
      JSON.stringify(indicator)
    );
  }

  getComparativeByYear(indicator: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Indicators/getComparativeByYear`,
      JSON.stringify(indicator)
    );
  }
}
