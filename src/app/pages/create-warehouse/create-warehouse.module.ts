import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateWarehousePageRoutingModule } from './create-warehouse-routing.module';

import { CreateWarehousePage } from './create-warehouse.page';

// import custom Components
import { ComponentsModule } from 'src/app/Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateWarehousePageRoutingModule,
    ComponentsModule,
  ],
  declarations: [CreateWarehousePage],
})
export class CreateWarehousePageModule {}
