import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewStorePageRoutingModule } from './view-store-routing.module';

import { ViewStorePage } from './view-store.page';

// import custom Components
import { ComponentsModule } from 'src/app/Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewStorePageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ViewStorePage],
})
export class ViewStorePageModule {}
