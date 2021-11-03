import { Component, OnInit, } from '@angular/core';
import { Platform } from "@ionic/angular";
// import the utilities
import { Utilities } from "src/Utils/Utilities";

// import the models
import { OfficeModel } from "src/app/Models/OfficeModel";
import { WarehouseModel } from 'src/app/Models/WarehouseModel';

// import the services
import { OfficeService } from "src/app/services/Office/office.service";
import { WarehouseService } from 'src/app/services/Warehouse/warehouse.service';

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.page.html',
  styleUrls: ['./create-warehouse.page.scss'],
})
export class CreateWarehousePage implements OnInit {
  Offices: Array<OfficeModel> = [];
  Wharehouse: WarehouseModel = <WarehouseModel>{};
  constructor(
    private officeService: OfficeService,
    private utils: Utilities,
    private warehouseService: WarehouseService,
    private platform: Platform
  ) {}

  ngOnInit() {}
  async ionViewWillEnter() {
    try {
      if (this.utils.getSession()) {
        const { idShop } = await this.utils.getSession();
        const requestOfficeByShop = await this.officeService.listOfficeByShop({
          idShop: idShop,
        });
        const responseRequestOfficeByShop = await requestOfficeByShop.json();
        console.log('Sedes :: ', responseRequestOfficeByShop);
        this.Offices = responseRequestOfficeByShop;
        this.Wharehouse.idOffice = 0; //this.Offices[0].idOffice;
        this.Wharehouse.idShop = idShop;
        // validate if exist a param
        const idWarehouse = this.platform.getQueryParam('idWarehouse');
        if (idWarehouse) {
          const requestWarehouseById =
            await this.warehouseService.listWarehousesById({
              idShop: idShop,
              idWarehouse: idWarehouse,
            });
          const responseRequestWarehouseById =
            await requestWarehouseById.json();
          console.log(
            'get current information :: ',
            responseRequestWarehouseById
          );
          this.Wharehouse = responseRequestWarehouseById[0];
          if (!this.Wharehouse.idOffice) {
            this.Wharehouse.idOffice = 0;
            this.Wharehouse.idShop = idShop;
          }
        }
      }
    } catch (error) {}
  }

  async save() {
    try {
      let error = false,
        message = '';
      // if (!this.Wharehouse.idOffice) {
      //   message +=
      //     '- Debes de seleccionar una sede a <BR>';
      //   error = true;
      // }

      if (!this.Wharehouse.code) {
        message +=
          '- Debes de ingresar un codigo para elmacen ya que nos sirve para identificar el almacen <BR>';
        error = true;
      }

      if (!this.Wharehouse.name) {
        message +=
          '- Debes de ingresar un nombre para elmacen ya que nos sirve para diferenciar el almacen <BR>';
        error = true;
      }

      if (error) {
        this.utils.customAlert('Creacion de almacenes', message);
        return false;
      }

      this.utils.showLoading('Cargando...');
      const requestCreateWarehouse = this.platform.getQueryParam('idWarehouse')
        ? await this.warehouseService.updateWarehouse(this.Wharehouse)
        : await this.warehouseService.createWarehouse(this.Wharehouse);
      const responseRequestCreateWarehouse =
        await requestCreateWarehouse.json();
      this.utils.hideLoader();
      console.log(
        'Response create warehouse :: ',
        responseRequestCreateWarehouse
      );

      if (
        !this.platform.getQueryParam('idWarehouse') &&
        !responseRequestCreateWarehouse.message
      ) {
        this.Wharehouse = <WarehouseModel>{};
        setTimeout(() => {
          this.utils.showToast(
            'Administracion de almacenes',
            'Se ha creado con exito el almacen',
            'SUCCESS'
          );
        }, 200);
        this.utils.goToPage('/warehouse');
      }
      if (
        this.platform.getQueryParam('idWarehouse') &&
        !responseRequestCreateWarehouse.message
      ) {
        setTimeout(() => {
          this.utils.showToast(
            'Administracion de almacenes',
            'Se ha actualizado con exito el almacen',
            'SUCCESS'
          );
        }, 200);
        this.utils.goToPage('/warehouse');
      }

      if (responseRequestCreateWarehouse.message) {
        this.utils.showToast(
          'Administracion de almacenes',
          responseRequestCreateWarehouse.message,
          'ERROR'
        );
      }
    } catch (error) {
      this.utils.hideLoader();
    }
  }

  OnChangeOffice($event) {
    
  }
}
