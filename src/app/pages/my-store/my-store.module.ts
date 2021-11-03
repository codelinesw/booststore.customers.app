import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStorePageRoutingModule } from './my-store-routing.module';

import { MyStorePage } from './my-store.page';


// import custom Components
import { ComponentsModule } from 'src/app/Components/components.module';

//import PopUpMaps
import { PopUpsComponentsModule } from 'src/app/Components/PopUpsComponents.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStorePageRoutingModule,
    ComponentsModule,
    PopUpsComponentsModule,
  ],
  declarations: [MyStorePage],
})
export class MyStorePageModule {}
