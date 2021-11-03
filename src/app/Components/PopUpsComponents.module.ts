import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {  PopUpMapsComponent } from "src/app/Components/PopUps/pop-up-maps/pop-up-maps.component";
import { PopUpSearchFilterComponent } from 'src/app/Components/PopUps/pop-up-search-filter/pop-up-search-filter.component';
import { PopUpTrackOrderComponent } from 'src/app/Components/PopUps/pop-track-order/pop-up-track-order.component';

@NgModule({
  declarations: [
    PopUpMapsComponent,
    PopUpSearchFilterComponent,
    PopUpTrackOrderComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [PopUpMapsComponent, PopUpSearchFilterComponent, PopUpTrackOrderComponent, RouterModule],
})
export class PopUpsComponentsModule {}
