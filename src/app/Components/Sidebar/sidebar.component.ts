import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Utilities } from 'src/Utils/Utilities';
import { FunctionService } from 'src/Utils/FunctionService';

// import the models
import { OptionsModel } from "src/app/Models/OptionsModel";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Input() contentId: string;
  currentPath: string = '';
  showMenu: boolean = false;
  show: boolean = false;
  icon: string = 'chevron-forward-outline';
  storeLogoType: string = '';
  storesName: string = '';
  options: Array<any> = [];
  idClassification: number = 0;
  shopType: number = 0;
  saleType: number = 0;
  withInventory: boolean = false;
  login: boolean = false;

  constructor(
    private menu: MenuController,
    private router: Router,
    public utils: Utilities,
    public events: FunctionService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    this.enableMenuOptions();
    this.openCustom();
    this.openFirst();
    console.log('current router', this.router.url);
    this.currentPath = this.utils.getCurrentPage();
  }

  showOptions(data: any, idClassification: string, storeLogoType: string) {
    console.error('DATA RECIBIDA :: ', data);
    this.options = JSON.parse(data);
    this.options = this.options.filter((item) => item.active);
    this.withInventory = this.options.find(
      (item) => item.option === 'Inventario'
    );
    this.withInventory = this.withInventory ? true : false;
    console.error('Inventario :: ', this.withInventory);
    var classification = parseInt(idClassification);
    console.log('tienda actual :: ', name);
    console.warn('Opciones :: ', this.options);
    if (classification > 4) {
      this.idClassification = 2;
    }
    if (classification < 5 && classification > 1) {
      this.idClassification = 1;
    }
    if (classification === 1) {
      this.idClassification = 3;
    }
    this.login = true;
    this.storeLogoType = storeLogoType;
  }

  enableMenuOptions() {
    this.shopType = 0;
    this.events.getLoginEvent().subscribe((data) => {
      console.warn('Respuesta capturada :: ', data);
      if (this.utils.getSession()) {
        const { image, name, options, idClassification, shopType, saleType } =
          this.utils.getSession();
        //console.error('Data received', !data ? options : data.foo.options);        
        this.showOptions(options, idClassification, image);
        this.storesName = data.name;
        this.shopType = parseInt(data.shopType);
        console.error(
          'Data received logueado',
          this.shopType == 1
        );
        this.saleType = parseInt(
          !this.utils.getSession() ? data.saleType : saleType
        );
      } else {
        if (data) {
          this.shopType = parseInt(data.shopType);
          console.error('Data received no logueado', this.shopType == 1);
          this.showOptions(data.options, data.idClassification, data.image);
          this.storesName = data.name;
        }
      }
    });
    if (this.utils.getSession()) {
      const { image, name, options, idClassification, shopType, saleType } =
        this.utils.getSession();
      this.showOptions(options, idClassification, image);
      this.storesName = name;
      this.shopType = parseInt(shopType);
      this.saleType = parseInt(saleType);
      console.error('Data received', shopType);
    }
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
    console.log('open menu');
  }

  openEnd() {
    this.menu.enable(false, 'custom');
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  goToPage(page: string) {
    this.currentPath = page.replace('/', '');
    this.utils.setCurrentPage(this.currentPath);
    this.router.navigate([page]);
  }

  signOut() {
    if (this.utils.removeSession()) {
      this.openEnd();
      this.utils.goToPage('/signin');
      this.options = [];
      this.login = false;
      this.storesName = null;
      this.storeLogoType = null;
    } else {
      this.utils.showToast(
        'Portal',
        'Ha ocurrido un error al cerrar la sesion',
        'ERROR'
      );
    }
  }

  showSection(section: string) {
    console.log('show section');
    document.getElementById(section).classList.toggle('showSection');
  }

}
