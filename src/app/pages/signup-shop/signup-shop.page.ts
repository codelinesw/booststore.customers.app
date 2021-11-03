import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

// import the utilities
import { Utilities } from "src/Utils/Utilities";

// import the models
import { ShopModel } from "src/app/Models/ShopModel";
import { ShopService } from 'src/app/services/Shop/shop.service';
import { FunctionService } from "src/Utils/FunctionService";

// import popUps
import { PopUpMapsComponent } from 'src/app/Components/PopUps/pop-up-maps/pop-up-maps.component';

@Component({
  selector: 'app-signup-shop',
  templateUrl: './signup-shop.page.html',
  styleUrls: ['./signup-shop.page.scss'],
})
export class SignupShopPage implements OnInit {
  @ViewChild('autofocus', { static: false }) input: IonInput;
  Shop: ShopModel = <ShopModel>{};
  formProgress: number = 0;
  inputType: string = 'password';
  iconPassword: string = 'eye-off-outline';
  listShopType: any = [
    {
      id: 1,
      text: '- Deseo llevar el control de mi inventario, trasladar productos entre almacenes',
      checked: false,
    },
    {
      id: 2,
      text: '- No tengo punto de venta pero quiero vender online y llevar el control de mi inventario',
      checked: false,
    },
  ];

  listSalesType: any = [
    {
      id: 1,
      text: '- Vender mis productos',
      checked: false,
    },
    {
      id: 2,
      text: '- Vender productos de un proveedor',
      checked: false,
    },
    {
      id: 3,
      text: '- Soy proveedor y quiero compartir mis productos a vendedores',
      checked: false,
    },
  ];

  textButton: string = 'Siguiente';

  constructor(
    private utils: Utilities, 
    private router: Router,
    private shopService: ShopService,
    private globalService: FunctionService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    //setTimeout(() => this.input.setFocus(), 300);
    this.textButton = 'Siguiente';
  }

  OnChangeClassification($event) {
    console.log('value :: ', $event.detail.value);
    this.Shop.idClassification = $event.detail.value;
  }

  onChangeShopType($event) {
    console.log('value  shop Type:: ', $event.detail.value);
    this.Shop.shopType = $event.detail.value;
    let currentIndex = this.listShopType.findIndex(item => item.id === parseInt($event.detail.value));
    let currentItem = this.listShopType.find(item => item.id === parseInt($event.detail.value));
    this.listShopType[currentIndex] = {...currentItem,checked: true};
  }

  onChangeSaleType($event){
    console.log('value sales Type:: ', $event.detail.value);
    this.Shop.saleType = $event.detail.value;
    let currentIndex = this.listSalesType.findIndex(
      (item) => item.id === parseInt($event.detail.value)
    );
    let currentItem = this.listSalesType.find(
      (item) => item.id === parseInt($event.detail.value)
    );
    this.listSalesType[currentIndex] = { ...currentItem, checked: true };
  }

  goBack() {
    if (this.formProgress >= 0 && this.formProgress <= 4) {
      this.formProgress--;
    }
  }

  async save() {
    let error = false,
      message = '';

    if (
      this.formProgress === 0 &&
      (!this.Shop.name || this.Shop.name.trim() === '')
    ) {
      error = true;
      message +=
        '- Debes de ingresar el nombre para la creacion de tu tienda virtual. <BR>';
    }

    if (this.formProgress === 0 && !this.Shop.idClassification) {
      error = true;
      message +=
        '- Debes de clasificar a que sector se ajuste mejor tu negocio. <BR>';
    }

    if (this.formProgress === 1 && !this.Shop.nit) {
      error = true;
      message +=
        '- Debes de ingresar el nit de tu negocio o la identificación del responsable de tu negocio. <BR>';
    }

    if (this.formProgress === 1 && !this.Shop.email) {
      error = true;
      message +=
        '- Debes de un correo electronico que recuerdes el ingreso para mantener en contacto con tu negocio o con el encargado. <BR>';
    }

    if (this.formProgress === 2 && !this.Shop.username) {
      error = true;
      message +=
        '- Debes de ingresar un nombre de usuario para ingresar a tu tienda. <BR>';
    }

    if (this.formProgress === 2 && !this.Shop.password) {
      error = true;
      message +=
        '- Debes de una contraseña que no se te dificulte recordar para poder ingresar a tu tienda. <BR>';
    }

    if (this.formProgress === 3 && !this.Shop.saleType) {
      error = true;
      message +=
        '- Debes de seleccionar la opcion que mas se ajuste a tu necesidad <BR>';
    }

    if (this.formProgress === 4 && !this.Shop.shopType &&
      (
        this.Shop.idClassification != 2 &&
        this.Shop.idClassification != 3 &&
        this.Shop.idClassification != 4
      )
    ) {
        error = true;
        message +=
            '- Debes de seleccionar la opcion que mas se ajuste a tu necesidad <BR>';
    }

    if (
     this.Shop.idClassification >= 2 &&
     this.Shop.idClassification <= 4 ||
     this.Shop.idClassification == 8
    ) {
      this.Shop.shopType = 1;
      this.textButton = 'Finalizar';
    }

    if (error) {
      await this.utils.customAlert('Registro de tu tienda virtual', message);
      return null;
    }

    if (this.utils.saveFirstShopinfo(this.Shop)) {
      
      if (
        this.formProgress >= 0 &&
        this.formProgress < 4 &&
        this.Shop.idClassification != 2 &&
        this.Shop.idClassification != 3 &&
        this.Shop.idClassification != 4 &&
        this.Shop.idClassification != 8
      ) {
        this.textButton = 'Continuar';
        this.formProgress++;
        return null;
      } 
      
      console.error("Validation :: ", this.Shop.idClassification == 2);
      if (
        this.formProgress >= 0 &&
        this.formProgress < 3 &&
        (
          this.Shop.idClassification == 2 ||
          this.Shop.idClassification == 3 ||
          this.Shop.idClassification == 4 ||
          this.Shop.idClassification == 8
        )
      ) {
        this.textButton = 'Finalizar';
        this.formProgress++;
        return null;
      } else {

        this.utils.showLoading('cargando...');
        try {
          const requestCreateShop = await this.shopService.register(this.Shop);
          const responseRCreateShop = await requestCreateShop.json();
          this.utils.hideLoader();
          if (responseRCreateShop.message) {
            this.utils.showToast(
              'Creacion de tienda',
              responseRCreateShop.message,
              'ERROR'
            );
          } else {
            console.warn(
              'Respuesta creacion de tienda :: ',
              responseRCreateShop
            );
            this.utils.showToast(
              'Creacion de tienda',
              'Se ha creado con exito la tienda, te vamos a dirigir al portal en unos segundos',
              'SUCCESS'
            );
            this.globalService.loginEvent(responseRCreateShop);
            this.utils.saveSession(responseRCreateShop);
            setTimeout(() => {
              this.utils.goToPage('/home');
            }, 1000);
          }
        } catch (error) {
          this.utils.hideLoader();
          this.utils.showToast('Creacion de tienda', error, 'ERROR');
        }
      }

    } else {
      await this.utils.customAlert(
        'Registro de tu tienda virtual',
        'Se ha producido un error, vuelva intentar de nuevo en unos minutos'
      );
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

  validateNumber($event): void {
    this.utils.validateOnlyNumber($event);
  }

  validateText($event): void {
    this.utils.validateOnlyLetter($event);
  }

  viewPassword() {
    if (this.inputType === 'password') {
      this.iconPassword = 'eye-outline';
      this.inputType = 'text';
    } else {
      this.iconPassword = 'eye-off-outline';
      this.inputType = 'password';
    }
  }

  addAnimation($event) {
    //console.log($event.target.parentNode.parentNode.parentNode.parentNode.children[0].tagName);
    if (
      $event.target.parentNode.parentNode.parentNode.parentNode.children[0]
        .tagName === 'ION-LABEL'
    ) {
      if ($event.target.parentNode.parentNode.parentNode) {
        $event.target.parentNode.parentNode.parentNode.parentNode.children[0].classList.add(
          'active'
        );
        $event.target.parentNode.parentNode.parentNode.classList.add('active');
      }
    }

    if (
      $event.target.parentNode.parentNode.parentNode.parentNode.children[0]
        .tagName === 'DIV'
    ) {
      console.log(
        $event.target.parentNode.parentNode.parentNode.parentNode.parentNode
      );
      if ($event.target.parentNode.parentNode.parentNode) {
        $event.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].classList.add(
          'active'
        );
        $event.target.parentNode.parentNode.parentNode.classList.add('active');
      }
    }
  }

  removeAnimation($event) {
    console.log($event.target.parentNode.parentNode);
    if ($event.target.parentNode.parentNode.parentNode) {
      $event.target.parentNode.parentNode.parentNode.parentNode.children[0].classList.remove(
        'active'
      );
      $event.target.parentNode.parentNode.parentNode.classList.remove('active');
    }
    if (
      $event.target.parentNode.parentNode.parentNode.parentNode.children[0]
        .tagName === 'DIV'
    ) {
      console.log(
        $event.target.parentNode.parentNode.parentNode.parentNode.parentNode
      );
      if ($event.target.parentNode.parentNode.parentNode) {
        $event.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].classList.remove(
          'active'
        );
        $event.target.parentNode.parentNode.parentNode.classList.remove(
          'active'
        );
      }
    }
  }
}
