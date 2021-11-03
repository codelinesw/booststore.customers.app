import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

//import utilities
import { Utilities } from "src/Utils/Utilities";

//import models
import { SuppliersModel } from 'src/app/Models/SuppliersModel';

//import services
import { SuppliersService } from 'src/app/services/Suppliers/suppliers.service';

@Component({
  selector: 'app-pop-up-create-supplier',
  templateUrl: './pop-up-create-supplier.component.html',
  styleUrls: ['./pop-up-create-supplier.component.scss'],
})
export class PopUpCreateSupplierComponent implements OnInit {
  // Suppliers: Array<SuppliersModel> = [
  //   {
  //     idSupplier: 1,
  //     name: "pepito",
  //     lastName: "perez",
  //     email: "pepitope@gmail.com",
  //     phone: "3133633254",
  //     document: "100223215"
  //   },
  //   {
  //     idSupplier: 2,
  //     name: "mario",
  //     lastName: "bros",
  //     email: "marioB@gmail.com",
  //     phone: "3133631110",
  //     document: "100223777"
  //   }
  // ];

  Supplier: SuppliersModel = <SuppliersModel>{};
  edit: boolean;
  idSupplier: number;
  

  constructor(
    private modalController: ModalController,
    private navParams : NavParams,
    private supplierServices: SuppliersService,
    private utils: Utilities
  ) { }

  ngOnInit() {}

  async ionViewWillEnter(){
    this.edit = this.navParams.data.edit;
    this.idSupplier = this.navParams.data.supplierInfo;
    if(this.edit && this.idSupplier ){
      // this.Supplier = this.Suppliers.find(item => item.idSupplier === this.idSupplier);
      try {
        const requestSupplierById = await this.supplierServices.listSuppliersById({idSupplier:this.idSupplier});
        const responseSupplierById = await requestSupplierById.json();
        if(!responseSupplierById.message){
          this.Supplier = responseSupplierById[0];
        }
        else{
          console.log("responseSupplierById: ", responseSupplierById);
        }
      } catch (error) {
      }

    } else {
      if(this.utils.getSession()){
        const { idShop } = await this.utils.getSession();
        this.Supplier.idShop = idShop; 
      }      
      
    }

    
  }

  async save(){
    if(this.validateSupplier()){
      try {
        console.warn("Datos enviados -> ", this.Supplier + " edit -> " + this.edit);
        this.utils.showLoading("Cargando...");
        const requestSupplier: any = this.edit
          ? await this.supplierServices.updateSupplier(this.Supplier) 
          : await this.supplierServices.createSupplier(this.Supplier);
        const responseSupplier: any = await requestSupplier.json();
        this.utils.hideLoader();
        if(this.edit && !responseSupplier.message){
          this.utils.customAlert("Administra tus proveedores", "El proveedor se ha actualizado con éxito.");
          this.updateList(true, responseSupplier);
        }
        else if(!this.edit && !responseSupplier.message){
          this.utils.customAlert("Administra tus proveedores", "El proveedor se ha registrado con éxito.");
          this.updateList(false, responseSupplier);
        }
        else if(responseSupplier.message){
          this.utils.customAlert("Administra tus proveedores", "Ha ocurrido un error al guardar la información del proveedor.")
        }
      } catch (error) {
        this.utils.hideLoader();
      }
    }
    else {
      this.utils.customAlert("Administra tus proveedores", "Debes llenar todos los campos para continuar.");
    }
    
  }

  validateSupplier(){
    if(!this.Supplier.name || this.Supplier.name === "undefined" || this.Supplier.name.length === 0){
      return false;
    }
    else if(!this.Supplier.document || this.Supplier.document === "undefined" || this.Supplier.document.length === 0){
      return false;
    }
    else if(!this.Supplier.phone || this.Supplier.phone === "undefined" || this.Supplier.phone.length === 0){
      return false;
    }
    else {
      return true;
    }
    
    // else if(!this.Supplier.lastName || this.Supplier.lastName === "undefined" || this.Supplier.lastName.length === 0){
    //   return false;
    // }
    // else if(!this.Supplier.email || this.Supplier.email === "undefined" || this.Supplier.email.length === 0){
    //   return false;
    // }
  }

  async closePopUp(){
    await this.modalController.dismiss();
  }

  async updateList(editData: boolean, newSupplier: any) {
    try {
      await this.modalController.dismiss(null);
      this.navParams.data.update.updateSuppliers(editData, newSupplier);
    } catch (error) {}
  }

}
