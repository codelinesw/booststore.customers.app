import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FunctionService {
  private menuOptionsDos$ = new EventEmitter<any>();
  private menuOptions$ = new Subject<any>();
  private chat$ = new EventEmitter<any>();

  publishSomeData(data: any) {
    this.menuOptions$.next(data);
  }

  getObservable(): Subject<any> {
    return this.menuOptions$;
  }

  loginEvent(info: any) {
    this.menuOptionsDos$.emit(info);
  }

  getLoginEvent() {
    return this.menuOptionsDos$;
  }

  addPToCart(info: any) {
    this.chat$.emit(info);
  }

  getProductOnCart() {
    return this.chat$;
  }
}
