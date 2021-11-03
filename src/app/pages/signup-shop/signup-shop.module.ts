import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupShopPageRoutingModule } from './signup-shop-routing.module';

import { SignupShopPage } from './signup-shop.page';

// Custom Components
import { ComponentsModule } from 'src/app/Components/components.module';

import { PopUpsComponentsModule  } from 'src/app/Components/PopUpsComponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupShopPageRoutingModule,
    ComponentsModule,
    PopUpsComponentsModule,
  ],
  declarations: [SignupShopPage],
})
export class SignupShopPageModule {}
