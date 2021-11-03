import { Component, OnInit } from '@angular/core';
// import the utilities
import { Utilities } from "src/Utils/Utilities";

// import the models
import { ClientModel } from "src/app/Models/ClientModel";


// import the services
import { ClientsService } from "src/app/services/Clients/clients.service";

// import modal controller
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up-create-client',
  templateUrl: './pop-up-create-client.page.html',
  styleUrls: ['./pop-up-create-client.page.scss'],
})
export class PopUpCreateClientComponent implements OnInit {
  Client: ClientModel = <ClientModel>{};
  Shops: any[] = [];

  constructor(
    private utils: Utilities,
    private clientsService: ClientsService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  async save() {
    let error = false,
      message = '';

    if (!this.Client.name && !this.Client.lastName && !this.Client.document) {
      error = true;
      message +=
        'Debes de ingresar los siguientes campos para poder registrar un cliente <BR> - Nombre <BR> - Apellido <BR> - Documento de identificación';
    }

    if (!this.Client.name) {
      error = true;
      message +=
        'Debes de ingresar los siguientes campos para poder registrar un cliente <BR> - Nombre';
    }

    if (!this.Client.lastName) {
      error = true;
      message +=
        'Debes de ingresar los siguientes campos para poder registrar un cliente <BR> - Apellido';
    }

    if (!this.Client.document) {
      error = true;
      message +=
        'Debes de ingresar los siguientes campos para poder registrar un cliente <BR> - Documento de identificación';
    }

    if (error) {
      this.utils.customAlert('Administración de clientes', message);
      return false;
    }

    try {
      const requestCreateClient = await this.clientsService.createClient(
        this.Client
      );
      const responseRequestCreateClient = await requestCreateClient.json();
      if (!responseRequestCreateClient.message) {
        this.utils.showToast(
          'ÉXITO',
          'Se registrado con éxito el cliente',
          'SUCCESS'
        );
      } else {
        this.utils.showToast(
          'ERROR',
          'Ha ocurrido un error al registrar un cliente',
          'ERROR'
        );
      }
    } catch (error) {}
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

  async closePopUpCreateClient() {
    await this.modalController.dismiss(null);
  }

  async searchClientByDocument() {
    if (!this.Client.document || this.Client.document.trim() === '') {
      this.utils.customAlert(
        'Administracion del cliente',
        'Debes de ingresar un numero de documento para poder cargar la informacion del cliente'
      );
      return false;
    }
    try {
      this.utils.showLoading('Cargando...');
      const requestClientInformation =
        await this.clientsService.listClientsByDocument({
          document: this.Client.document,
        });
      const responseRequestClientInfo = await requestClientInformation.json();
      this.utils.hideLoader();
      if (responseRequestClientInfo.length > 0) {
        this.Client = responseRequestClientInfo[0];
        const { idShop } = await this.utils.getSession();
        this.Client.idShop = idShop;
        console.log('Client information :: ', this.Client);
      }
    } catch (error) {
      this.utils.hideLoader();
    }
  }
}
