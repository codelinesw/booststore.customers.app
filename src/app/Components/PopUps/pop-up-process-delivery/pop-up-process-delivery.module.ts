import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PopUpProcessDeliveryComponent } from './pop-up-process-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: PopUpProcessDeliveryComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PopUpProcessDeliveryComponent],
})
export class PopUpProcessDeliveryModule {}
