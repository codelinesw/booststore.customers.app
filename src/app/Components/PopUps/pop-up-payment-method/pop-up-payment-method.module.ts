import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PopUpPaymentMethodComponent } from './pop-up-payment-method.page';

import { PopUpsComponentsModule } from 'src/app/Components/PopUpsComponents.module';

const routes: Routes = [
  {
    path: '',
    component: PopUpPaymentMethodComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PopUpsComponentsModule,
  ],
  declarations: [PopUpPaymentMethodComponent],
})
export class PopUpPaymentMethodModule {}
