import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './Components/components.module';

// import android permissions
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

// import angular auth and angular fire module
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";

// import environments
import { environment } from "src/environments/environment";

// Pop Ups
import { PopUpWarehouseSupplyModule} from 'src/app/Components/PopUps/pop-up-warehouse-supply/pop-up-warehouse-supply.module';
import { PopUpCreateClientModule } from 'src/app/Components/PopUps/pop-up-create-client/pop-up-create-client.module';
import { PopUpPaymentMethodModule } from 'src/app/Components/PopUps/pop-up-payment-method/pop-up-payment-method.module';
import { PopUpProcessDeliveryModule } from 'src/app/Components/PopUps/pop-up-process-delivery/pop-up-process-delivery.module';

// import library chart
import { ChartsModule } from 'ng2-charts';

//import qr scanner cordova
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

//import Call Number
import { CallNumber } from '@ionic-native/call-number/ngx';

// import barcode Scan
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    HttpClientModule,
    ComponentsModule,
    PopUpWarehouseSupplyModule,
    PopUpCreateClientModule,
    PopUpPaymentMethodModule,
    PopUpProcessDeliveryModule,
    ChartsModule,
  ],
  providers: [
    AndroidPermissions,
    QRScanner,
    CallNumber,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
