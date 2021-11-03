import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeDeliveryPageRoutingModule } from './home-delivery-routing.module';

import { HomeDeliveryPage } from './home-delivery.page';

// import custom Components
import { ComponentsModule } from 'src/app/Components/components.module';

import { PopUpsComponentsModule } from 'src/app/Components/PopUpsComponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDeliveryPageRoutingModule,
    ComponentsModule,
    PopUpsComponentsModule,
  ],
  declarations: [HomeDeliveryPage],
})
export class HomeDeliveryPageModule {}
