import { Injectable } from '@angular/core';

import { HttpClient } from 'src/app/HttpClient/';


import { URL_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(private http: HttpClient) {}

  create(expenses: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Expenses/add`,
      JSON.stringify(expenses)
    );
  }

  update(expenses: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Expenses/update`,
      JSON.stringify(expenses)
    );
  }

  delete(expenses: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Expenses/delete`,
      JSON.stringify(expenses)
    );
  }

  listExpensesByShop(category: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Expenses/listExpensesByShop`,
      JSON.stringify(category)
    );
  }

  listExpensesByOffice(expenses: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Expenses/listExpensesByOffice`,
      JSON.stringify(expenses)
    );
  }

  listExpenseById(expense: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/Expenses/listExpenseById`,
      JSON.stringify(expense)
    );
  }

  // Expenses Type

  createExpensesType(expensesType: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/ExpensesType/add`,
      JSON.stringify(expensesType)
    );
  }

  updateExpensesType(expensesType: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/ExpensesType/update`,
      JSON.stringify(expensesType)
    );
  }

  deleteExpensesType(expensesType: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/ExpensesType/delete`,
      JSON.stringify(expensesType)
    );
  }

  listExpensesTypeByShop(expensesType: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/ExpensesType/listExpensesTypeByShop`,
      JSON.stringify(expensesType)
    );
  }

  listExpensesTypeByOffice(expensesType: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/ExpensesType/listExpensesTypeByOffice`,
      JSON.stringify(expensesType)
    );
  }

  listExpensesTypeById(expensesType: any) {
    return this.http.consumerPOST(
      `${URL_BASE}/ExpensesType/listExpensesTypeById`,
      JSON.stringify(expensesType)
    );
  }
  
}
