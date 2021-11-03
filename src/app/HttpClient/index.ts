import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpClient {
  constructor() {}

  configureHeader(obj?: any, token?: string, method_?: string) {
    const needToken = token ? { Authorization: `Bearer ${token}` } : {};
    const type = method_ ? method_ : 'POST';
    //console.log('header => ', needToken);
    console.log('obj ', obj);
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...needToken,
      },
      method: type,
      body: obj,
    };
  }

  consumerPOST(url: string, body?: string, token?: string, type?: string) {
    try {
      return fetch(url, this.configureHeader(body, token));
    } catch (error) {
      return Promise.reject('Upps! Ha ocurrido un error de red');
    }
  }

  consumerGET(url: string, body?: string, token?: string) {
    return fetch(url, this.configureHeader(body, token, 'GET'));
  }

  consumerPUT(url: string, body?: string, token?: string) {
    return fetch(url, this.configureHeader(body, token, 'PUT'));
  }

}
