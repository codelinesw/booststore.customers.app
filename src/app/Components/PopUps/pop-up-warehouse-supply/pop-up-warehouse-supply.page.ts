import { Component, OnInit } from '@angular/core';
import { Utilities } from 'src/Utils/Utilities';
// import modal controller
import { ModalController, NavParams, Platform } from '@ionic/angular';
// import the models
import { WarehouseModel } from 'src/app/Models/WarehouseModel';
import { InventoryModel } from 'src/app/Models/InventoryModel';

// import services
import { WarehouseService } from "src/app/services/Warehouse/warehouse.service";
import { InventoryService } from "src/app/services/Inventory/inventory.service";

@Component({
  selector: 'app-pop-up-warehouse-supply',
  templateUrl: './pop-up-warehouse-supply.page.html',
  styleUrls: ['./pop-up-warehouse-supply.page.scss'],
})
export class PopUpWarehouseSupplyComponent implements OnInit {
  Warehouse: Array<WarehouseModel> = [];
  Inventory: InventoryModel = <InventoryModel>{};
  warehouses: any[] = [];
  warehouseList: number[] = [];
  constructor(
    private modalController: ModalController,
    private utils: Utilities,
    private warehouseService: WarehouseService,
    private params: NavParams,
    private inventoryService : InventoryService,
    private platform: Platform
  ) {}

  ngOnInit() {}
  async closePopUpWarehouseSupply() {
    await this.modalController.dismiss(null);
  }
  async ionViewWillEnter() {
    try {
      if (this.utils.getSession()) {
        const { idShop } = await this.utils.getSession();
        const requestAllWarehouseByShop =
          await this.warehouseService.listWarehousesByShop({
            idShop: idShop,
          });
        const responseRequestAWByShop = await requestAllWarehouseByShop.json();
        this.Warehouse = responseRequestAWByShop;
        console.log('Response all warehouse :: ', this.Warehouse);
        if (this.Warehouse.length > 0) {
          const { idProduct, productName } = this.params.data;
          this.Inventory.idShop = idShop;
          this.Inventory.idWarehouse = this.Warehouse[0].idWarehouse;
          this.warehouses.push({idWarehouse : this.Warehouse[0].idWarehouse });
          this.warehouseList.push(this.Warehouse[0].idWarehouse);
          this.Inventory.idProduct = idProduct;
          this.Inventory.productName = productName;
          console.log('Current product :: ', this.warehouseList);
        }
      }
    } catch (error) {
      console.log('Error :: ', error);
    }
  }

  OnChangeWarehouse($event) {
    this.warehouses = $event.detail.value.map((item , index) => (
      {
        idWarehouse: item
      }
    ));
    console.log(
      'warehouses :: ',
      this.warehouses
    );
  }

  addAnimation($event) {
    console.log(
      $event.target.parentNode.parentNode.parentNode.parentNode.children[0]
        .tagName
    );
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

    if (
      $event.target.parentNode.parentNode.parentNode.parentNode.children[0]
        .tagName === 'ION-ROW'
    ) {
      console.log($event.target.parentNode.parentNode);
      $event.target.parentNode.parentNode.parentNode.children[0].classList.add(
        'active'
      );
      $event.target.parentNode.parentNode.classList.add('active');
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

  validateNumber($event, needAddCurrencyFormat?: boolean): void {
    this.utils.validateOnlyNumber($event);
  }

  async save(){
    
    let message = '',
      error = false;

    if (this.warehouses.length == 0) {
      message += '- Debes de seleccionar el almacen que vas abastecer <br>';
      error = true;
    }

    if (!this.Inventory.qtyAvailable || this.Inventory.qtyAvailable === 0) {
      message +=
        '- Debes de seleccionar de seleccionar una cantidad de disponibilidad del producto, para abastecer el almacen <br>';
      error = true;
    }

    if (error) {
      this.utils.customAlert('Creacion de productos', message);
      return null;
    }

    console.log('Send data :: ', this.Inventory);

    try {
      this.Inventory.warehouses = JSON.stringify(this.warehouses);
      this.utils.showLoading('Cargando...');
      const requestCreateInventory = this.platform.getQueryParam('idInventory')
        ? await this.inventoryService.updateInventory(this.Inventory)
        : await this.inventoryService.createInventory(this.Inventory);
      const responseRequestCreateInventory =
        await requestCreateInventory.json();
      this.utils.hideLoader();
      console.log(
        'Response create Inventory :: ',
        responseRequestCreateInventory
      );
      if (
        !this.platform.getQueryParam('idWarehouse') &&
        !responseRequestCreateInventory.message
      ) {
          this.utils.presentToast('El producto se creo con exito');
          this.Inventory = <InventoryModel>{};
      } else {
          if (responseRequestCreateInventory.status === 'failed') {
            this.utils.customAlert(
              responseRequestCreateInventory.message,
              'Administracion de productos'
            );
          }
      }

      if (
        this.platform.getQueryParam('idProduct') &&
        responseRequestCreateInventory.message
      ) {
        this.utils.customAlert(
          'Administracion de productos',
          'Se ha actualizado con exito el producto',
          () => {
            this.utils.goToPage('/products');
          }
        );
      }
    } catch (error) {
      this.utils.hideLoader();
      console.log('Error :: ', error);
    }
  }
}
