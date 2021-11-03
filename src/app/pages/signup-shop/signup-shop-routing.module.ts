import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupShopPage } from './signup-shop.page';

const routes: Routes = [
  {
    path: '',
    component: SignupShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupShopPageRoutingModule {}
