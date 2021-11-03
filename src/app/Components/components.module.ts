import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { HeaderSectionComponent } from './header-section/header-section.component';
import { IonicModule } from "@ionic/angular";
import { FooterComponent } from "./footer/footer.component";
import { PopUpWarehouseSupplyComponent } from "./PopUps/pop-up-warehouse-supply/pop-up-warehouse-supply.page";
// import sideBar
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderSectionComponent,
    FooterComponent
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    HeaderComponent,
    HeaderSectionComponent,
    FooterComponent,
    RouterModule
  ],
})
export class ComponentsModule {}
