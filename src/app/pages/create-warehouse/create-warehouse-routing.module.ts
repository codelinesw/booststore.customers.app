import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateWarehousePage } from './create-warehouse.page';

const routes: Routes = [
  {
    path: '',
    component: CreateWarehousePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateWarehousePageRoutingModule {}
