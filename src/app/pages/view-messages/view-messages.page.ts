import { Component, OnInit } from '@angular/core';
// import the utilities
import { Utilities } from "src/Utils/Utilities";

// import the models
import { ClientModel } from "src/app/Models/ClientModel";
import { SessionModel } from 'src/app/Models/SessionModel';

// import the services
import { ShopService } from "src/app/services/Shop/shop.service";
import { FunctionService } from 'src/Utils/FunctionService';

// import the services
import { MessagesService } from "src/app/services/Messages/messages.service";

@Component({
  selector: 'app-view-messages',
  templateUrl: './view-messages.page.html',
  styleUrls: ['./view-messages.page.scss'],
})
export class ViewMessagesPage implements OnInit {
  Login: SessionModel = <SessionModel>{};
  iconPassword: string = 'eye-off-outline';
  inputType: string = 'password';
  uuid: string;
  selectedUser: any = {};
  CurrentMessages: any[] = [];
  selectedUserType: number = 1;
  constructor(
    public utils: Utilities,
    private shopService: ShopService,
    public events: FunctionService,
    private messageService: MessagesService
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    try {
      if (this.utils.getSession()) {
        const { idStoreUser, uuid } = await this.utils.getSession();
        this.uuid = uuid;
        console.log('Current user :: ', this.uuid);
        const { uuidUser, nameUser, userAvatar, selectedUserType } =
          await this.utils.getCurrentUserChat();
        this.selectedUser.uuid = uuidUser;
        this.selectedUser.name = nameUser;
        this.selectedUser.userAvatar = userAvatar;
        this.selectedUserType = selectedUserType;
        console.log('Current user Avatar :: ', userAvatar);
        await this.getCurrentMessages(uuidUser, nameUser);
        // console.log(
        //   'Mensajes :: ',
        //   this.currentMessages.sort(
        //     (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        //   )
        // );
        // this.currentMessages = this.currentMessages.sort(
        //   (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        // );
      }
    } catch (error) {
      console.log('Error :: ', error);
    }
  }

  async save() {
    let error = false,
      message = '';

    if (!this.Login.username && !this.Login.password) {
      error = true;
      message =
        'Ups! debes de ingresar tu nombre de usuario y contrasenia para poder ingresar';
    }

    if (!this.Login.username) {
      error = true;
      message =
        'Ups! debes de ingresar tu nombre de usuario para poder ingresar';
    }

    if (!this.Login.password) {
      error = true;
      message = 'Ups! debes de ingresar tu contrasenia para poder ingresar';
    }

    if (error) {
      this.utils.showToast('Iniciar sesion', message, 'ERROR');
      return null;
    }

    try {
      this.utils.showLoading('Cargando...');
      const requestSignIn = await this.shopService.signIn(this.Login);
      const responseRequestSignIn = await requestSignIn.json();
      this.utils.hideLoader();
      console.log('Response SignIn :: ', responseRequestSignIn);
      if (!responseRequestSignIn.message) {
        this.events.loginEvent(responseRequestSignIn);
        //this.events.publishSomeData({ foo: responseRequestSignIn });
        this.utils.saveSession(responseRequestSignIn);
        this.utils.goToPage('/home');
      } else {
        this.utils.showToast(
          'Iniciar sesion',
          responseRequestSignIn.message,
          'ERROR'
        );
      }
    } catch (error) {
      this.utils.hideLoader();
      this.utils.showToast('Iniciar sesion', error, 'ERROR');
    }
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

  goToPage(route: string) {
    this.utils.goToPage(route);
  }

  getCurrentMessages(idStoreUserSended: string, displayName: string) {
    this.selectedUser.uuid = idStoreUserSended;
    this.selectedUser.name = displayName;
    if (this.selectedUserType === 1) {
      this.messageService
        .getMessagesClients(idStoreUserSended)
        .subscribe((conversations) => {
          this.CurrentMessages = conversations.sort(
            (a, b) =>
              new Date(a.dateCreated).getTime() -
              new Date(b.dateCreated).getTime()
          );
          this.CurrentMessages = conversations;
        });
    } else {
      this.messageService
        .getMessages(idStoreUserSended)
        .subscribe((conversations) => {
          this.CurrentMessages = conversations.sort(
            (a, b) =>
              new Date(a.dateCreated).getTime() -
              new Date(b.dateCreated).getTime()
          );
          this.CurrentMessages = conversations;
        });
    }
    console.warn('Get current messages :: ', this.CurrentMessages);
    console.log('uuid sended :: ', this.selectedUser.uuid);
  }

  cleanPlaceholder($event) {}

  setContent($event) {
    
  }
}
