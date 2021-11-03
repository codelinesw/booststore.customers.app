import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, IonSlides } from '@ionic/angular';


// impor the utilities
import { Utilities } from "src/Utils/Utilities";

// import the models
import { SessionModel } from "src/app/Models/SessionModel";
import { ShopService } from 'src/app/services/Shop/shop.service';

//import PopUpMaps
import { PopUpMapsComponent } from 'src/app/Components/PopUps/pop-up-maps/pop-up-maps.component';


@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.page.html',
  styleUrls: ['./my-store.page.scss'],
})
export class MyStorePage implements OnInit {

  @ViewChild('fileinputImage', { static: false }) fileinputImage: ElementRef;
  @ViewChild('fileinputBanner', { static: false }) fileinputBanner: ElementRef;
  Shop: SessionModel = <SessionModel>{};
  acceptedFileExtension = ['png', 'jpg', 'jpeg'];
  currentImageIndex: number = 0;
  storeLogoType: any = [];
  storeBanner: any = [];

  constructor(
    public navCtrl: NavController, 
    public utils: Utilities,
    private shopService: ShopService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  // Initialize slider
  async ionViewWillEnter() {
    if (this.utils.getSession()) {
      this.Shop = await this.utils.getSession();
      this.Shop.openingHours = this.utils.getHours(this.Shop.openingHours);
      this.Shop.closingTime = this.utils.getHours(this.Shop.closingTime);
      console.log('INFORMACION DE LA TIENDA ACTUAL :: ', this.Shop);
    }
  }

  OnChangeClassification($event) {
    this.Shop.idClassification = $event.detail.value;
    console.warn("Clasificacion de la tienda :: ", this.Shop.idClassification);
  }

  async uploadImage($event, index?: number) {
    let files = $event.target.files;
    console.warn('current files :: ', files);
    if (files && files.length > 0) {
      console.warn('size files :: ', files.length);
      if (files.length > 4) {
        this.utils.showToast(
          'Creacion de productos',
          'Solo se pueden cargar un maximo de 4 imagenes por producto',
          'ERROR'
        );
      } else {
        for (let i = 0; i < files.length; i++) {
          console.log(
            'Validando la extension :: ',
            this.utils.extensionValidation(
              files[i].name,
              this.acceptedFileExtension
            )
          );
          if (
            this.utils.extensionValidation(
              files[i].name,
              this.acceptedFileExtension
            )
          ) {
            const result = await this.utils.fileToBase64(files[i]);
            let aux = result
              .toString()
              .replace('data:image/jpg;base64,', '')
              .replace('data:image/png;base64,', '')
              .replace('data:image/jpeg;base64,', '');
            //console.log('base64 :: ', result.toString());
            let extensionFile = files[i].name.trim().split('.');
            extensionFile = extensionFile[extensionFile.length - 1];
            this.storeLogoType.push({
              id: i + 1,
              extension: extensionFile,
              baseFile: result.toString(),
              storeName: this.Shop.name.replace(/\s+/g, '_'),
            });
            this.Shop.image = result.toString();
            console.log('image List :: ', this.storeLogoType);
            this.currentImageIndex = i;
          }
        }
      }
    }
  }

  async uploadBanner($event, index?: number) {
    let files = $event.target.files;
    console.warn('current files :: ', files);
    if (files && files.length > 0) {
      console.warn('size files :: ', files.length);
      if (files.length > 4) {
        this.utils.showToast(
          'Creacion de productos',
          'Solo se pueden cargar un maximo de 4 imagenes por producto',
          'ERROR'
        );
      } else {
        for (let i = 0; i < files.length; i++) {
          console.log(
            'Validando la extension :: ',
            this.utils.extensionValidation(
              files[i].name,
              this.acceptedFileExtension
            )
          );
          if (
            this.utils.extensionValidation(
              files[i].name,
              this.acceptedFileExtension
            )
          ) {
            const result = await this.utils.fileToBase64(files[i]);
            let aux = result
              .toString()
              .replace('data:image/jpg;base64,', '')
              .replace('data:image/png;base64,', '')
              .replace('data:image/jpeg;base64,', '');
            //console.log('base64 :: ', result.toString());
            let extensionFile = files[i].name.trim().split('.');
            extensionFile = extensionFile[extensionFile.length - 1];
            this.storeBanner.push({
              id: i + 1,
              extension: extensionFile,
              baseFile: result.toString(),
              storeName: this.Shop.name.replace(/\s+/g, '_'),
            });
            this.Shop.banner = result.toString();
            console.log('image List :: ', this.storeBanner);
            this.currentImageIndex = i;
          }
        }
      }
    }
  }

  chooseImage(index?: number) {
    //this.currentImageIndex = index;
    console.log('Selecciona imagen :: ', index);
    this.fileinputImage.nativeElement.click();
  }

  chooseBanner(index?: number) {
    //this.currentImageIndex = index;
    console.log('Selecciona imagen :: ', index);
    this.fileinputBanner.nativeElement.click();
  }

  async save() {
    try {
      this.Shop.image = JSON.stringify(this.storeLogoType);
      this.Shop.banner = JSON.stringify(this.storeBanner);
      const requestUpdateShop = await this.shopService.update(this.Shop);
      const responseRUpdateS = await requestUpdateShop.json();
      console.log("Response update shop information :: ", responseRUpdateS);
      if (!responseRUpdateS.message) {
        this.utils.showToast("Tienda","Se ha actualizado correctamente la informacion de la tienda","SUCCESS");
        this.utils.setSession(responseRUpdateS);
      } else {
        this.utils.showToast('Tienda', responseRUpdateS.message, 'FAILED');
      }
    } catch (error) {
      this.utils.showToast('Tienda', error, 'FAILED');
    }
  }

  async openMap(){
    const modal = await this.modalController.create({
      component: PopUpMapsComponent,
      cssClass: "map-custom-modal",
      componentProps: {},
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned.data) {
          this.Shop.address = dataReturned.data;
        }
      }
    });

    return await modal.present();
  }

}
