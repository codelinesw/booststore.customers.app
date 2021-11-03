import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PopUpWarehouseSupplyComponent } from './pop-up-warehouse-supply.page';

const routes: Routes = [
  {
    path: '',
    component: PopUpWarehouseSupplyComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PopUpWarehouseSupplyComponent],
})
export class PopUpWarehouseSupplyModule {}
