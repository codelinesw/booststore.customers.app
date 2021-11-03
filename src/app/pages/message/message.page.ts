import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';


import { Utilities } from 'src/Utils/Utilities';

// import the modules
import { UserModel } from "src/app/Models/UserModel";

// import the services
import { MessagesService } from "src/app/services/Messages/messages.service";
import { UserService } from "src/app/services/User/user.service";
import { ClientsService } from 'src/app/services/Clients/clients.service';
import { FunctionService } from 'src/Utils/FunctionService';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  Conversations: any[] = [];
  visible: boolean = false;
  // currentMessages: any[] = [
  //   {
  //     idStoreUser: 1,
  //     text: 'Hola, buenas tardes el producto sigue estando disponible?',
  //     time: '2021-10-04 14:25:00',
  //     response: [],
  //   },
  //   {
  //     idStoreUser: 1,
  //     text: 'Hola, buenas tardes el producto sigue estando disponible?',
  //     time: '2021-10-04 14:30:00',
  //     response: [],
  //   },
  //   {
  //     idStoreUser: 2,
  //     text: 'con este link podras encontrar otro tipo de referencias',
  //     time: '2021-10-04 14:25:00',
  //     response: [],
  //   },
  //   {
  //     idStoreUser: 1,
  //     text: 'Ok, muchas gracias',
  //     time: '2021-10-04 14:42:00',
  //     response: [],
  //   },
  //   {
  //     idStoreUser: 2,
  //     text: 'Hola, buenas tardes el producto sigue estando disponible?',
  //     time: '2021-10-04 14:30:00',
  //     response: [],
  //   },
  // ];
  uuid: string;
  CurrentMessages: any[] = [];
  selectedUser: any = {};
  Users: UserModel[] = [];
  selectedUserType: number = 1;
  textInfo: string;

  constructor(
    private messageService: MessagesService,
    private firestore: AngularFirestore,
    public utils: Utilities,
    private userService: UserService,
    private clientsService: ClientsService,
    private platform: Platform,
    public events: FunctionService
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    try {
      if (this.utils.getSession()) {
        const { idStoreUser, uuid } = await this.utils.getSession();
        this.uuid = uuid;
        console.log('Current user :: ', this.uuid);
        this.getAllConversations();
        this.visible =
          this.platform.is('ios') ||
          this.platform.is('android') ||
          this.platform.is('cordova')
            ? false
            : true;
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

  getAllConversations() {
    if (this.selectedUserType === 2) {
      this.messageService.getAllCDeliverers().subscribe((conversations) => {
        this.Conversations = conversations
          .sort(
            (a, b) =>
              new Date(a.dateCreated).getTime() -
              new Date(b.dateCreated).getTime()
          )
          .reverse();
        console.log('Get all conversations :: ', conversations);
      });
    } else {
      this.messageService.getAllCClients().subscribe((conversations) => {
        this.Conversations = conversations
          .sort(
            (a, b) =>
              new Date(a.dateCreated).getTime() -
              new Date(b.dateCreated).getTime()
          )
          .reverse();
        console.log('Get all conversations :: ', conversations);
      });
    }
  }

  getCurrentMessages(idStoreUserSended: string, displayName: string) {
    this.selectedUser.uuid = idStoreUserSended;
    this.selectedUser.name = displayName;
    this.utils.setCurrentUserChat({
      uuidUser: idStoreUserSended,
      nameUser: displayName,
      userAvatar:
        'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
      selectedUserType: this.selectedUserType
    });
    // this.events.setUserChat({
    //   uuidUser: idStoreUserSended,
    //   nameUser: displayName,
    // });
    this.utils.goToPage('/view-messages');
    // if (this.selectedUserType === 1) {
    //   this.messageService
    //     .getMessagesClients(idStoreUserSended)
    //     .subscribe((conversations) => {
    //       this.CurrentMessages = conversations.sort(
    //         (a, b) =>
    //           new Date(a.dateCreated).getTime() -
    //           new Date(b.dateCreated).getTime()
    //       );
    //       this.CurrentMessages = conversations;
    //     });
    // } else {
    //   this.messageService
    //     .getMessages(idStoreUserSended)
    //     .subscribe((conversations) => {
    //       this.CurrentMessages = conversations.sort(
    //         (a, b) =>
    //           new Date(a.dateCreated).getTime() -
    //           new Date(b.dateCreated).getTime()
    //       );
    //       this.CurrentMessages = conversations;
    //     });
    // }
    console.warn('Get current messages :: ', this.CurrentMessages);
    console.log('uuid sended :: ', this.selectedUser.uuid);
  }

  selectedTab($event, index: number) {
    this.selectedUserType = index + 1;
    this.getAllConversations();
    console.log('Default option :: ', this.selectedUserType);
  }

  chooseItem($event, uuid: string, name: string, lastName: string) {
    this.selectedUser.name = name + ' ' + lastName;
    document.getElementById('subMenuOptions').classList.remove('active');
    this.getCurrentMessages(uuid, this.selectedUser.name);
  }

  async searchClients(idShop: number, name: string) {
    try {
      const requestClients = await this.clientsService.listClientsByName({
        idShop: idShop,
        name: name,
      });
      const responseRequestC = await requestClients.json();
      console.warn('Response Clients :: ', responseRequestC);
      if (!responseRequestC.message) {
        this.Users = responseRequestC;
      } else {
        this.utils.showToast('Mensajes', responseRequestC.message, 'ERROR');
      }
    } catch (error) {
      this.utils.showToast('Mensajes', error, 'ERROR');
    }
  }

  async buscarRepartidor(idShop: number, name: string) {
    try {
      const requestDeliverers = await this.userService.listDeliverersByName({
        idShop: idShop,
        name: name,
      });
      const responseRequestD = await requestDeliverers.json();
      console.warn('Response Deliverers :: ', responseRequestD);
      if (!responseRequestD.message) {
        this.Users = responseRequestD;
      } else {
        this.utils.showToast('Mensajes', responseRequestD.message, 'ERROR');
      }
    } catch (error) {
      this.utils.showToast('Mensajes', error, 'ERROR');
    }
  }

  async searchItems($event) {
    console.log('Nombres a buscar... ', $event.target.value);
    let currentName = $event.target.value;
    const { idShop } = this.utils.getSession();
    if (this.selectedUserType === 1) {
      this.searchClients(idShop, currentName);
    } else {
      this.buscarRepartidor(idShop, currentName);
    }
  }

  setContent($event) {
    console.error('Texto escribido ', $event.target.textContent.length);
    if ($event.target.textContent.length > 0) {
      $event.target.classList.add('active');
      this.textInfo = $event.target.textContent;
    } else {
      this.textInfo = null;
      $event.target.classList.remove('active');
    }
  }

  cleanPlaceholder($event) {
    $event.target.classList.add('active');
  }

  cleanTextArea() {
    document.getElementById('textarea').textContent = '';
  }

  async save() {
    this.selectedUser.displayName = this.selectedUser.name;
    if (this.selectedUserType == 1) {
      this.messageService.sendMessageClients(this.selectedUser, this.textInfo);
      document.getElementById('textarea').textContent = '';
      this.textInfo = null;
      this.textInfo = '';
    } else {
      this.messageService.sendMessage(this.selectedUser, this.textInfo);
      document.getElementById('textarea').textContent = '';
      this.textInfo = null;
      this.textInfo = '';
    }
  }
}
