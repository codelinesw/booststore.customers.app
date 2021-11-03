import { Injectable } from '@angular/core';
import { HttpClient } from 'src/app/HttpClient/';

// import the models
import { Collections } from 'src/app/Models/Db';

import { URL_BASE_FIREBASE } from 'src/environments/environment';
// import the angular firestore
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Utilities } from 'src/Utils/Utilities';
import { objectify } from 'tslint/lib/utils';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore,
    private utils: Utilities
  ) {}

  getAllCDeliverers() {
    //  (ref) =>
    //    ref
    //      .where('idShop', '==', parseInt(idShop))
    //      .where('idOffice', '==', parseInt(idOffice))
    //      .where('idStoreUser', '==', parseInt(idStoreUser));
    const { idShop, idOffice, idStoreUser, uuid } = this.utils.getSession();
    return this.firestore
      .collection('Conversations')
      .doc(Collections.EMPLOYEES)
      .collection(uuid)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((item) => {
            let obj: any = item.payload.doc.data();
            console.log('info :: ', obj);
            return {
              ...obj,
              id: item.payload.doc.id,
            };
          })
        )
      );
  }

  getAllCClients() {
    const { idShop, idOffice, idStoreUser, uuid } = this.utils.getSession();
    return this.firestore
      .collection('Conversations')
      .doc(Collections.CLIENTS)
      .collection(uuid)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((item) => {
            let obj: any = item.payload.doc.data();
            console.log('info :: ', obj);
            return {
              ...obj,
              id: item.payload.doc.id,
            };
          })
        )
      );
  }

  getMessages(uuidStoreUserSended: string) {
    const { idShop, idOffice, uuid } = this.utils.getSession();
    console.log('idFrom :: ' + uuid + ' idTo :: ' + uuidStoreUserSended);
    return this.firestore
      .collection('Conversations')
      .doc(Collections.EMPLOYEES)
      .collection(uuid)
      .doc(uuidStoreUserSended)
      .collection('Messages')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((item) => {
            let obj: any = item.payload.doc.data();
            console.log('info :: ', obj);
            return {
              ...obj,
              id: item.payload.doc.id,
            };
          })
        )
      );
  }

  getMessagesClients(uuidStoreUserSended: string) {
    const { idShop, idOffice, uuid } = this.utils.getSession();
    console.log('idFrom :: ' + uuid + ' idTo :: ' + uuidStoreUserSended);
    return this.firestore
      .collection('Conversations')
      .doc(Collections.CLIENTS)
      .collection(uuid)
      .doc(uuidStoreUserSended)
      .collection('Messages')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((item) => {
            let obj: any = item.payload.doc.data();
            console.log('info :: ', obj);
            return {
              ...obj,
              id: item.payload.doc.id,
            };
          })
        )
      );
  }

  getCurrentMessages(conversation: any) {
    return this.http.consumerPOST(
      `${URL_BASE_FIREBASE}/Messages/getCurrentMessages`,
      JSON.stringify(conversation)
    );
  }

  async sendMessage(contact: any, text: string) {
    if (text && text.length > 0) {
      const { uuid, name, lastName, fullName, username } =
        this.utils.getSession();
      try {
        const info = {
          contact: { ...contact },
          message: {
            content: {
              text: text,
            },
          },
          dateCreated: this.utils.getFormatDate(),
        };

        const newInfo = {
          ...info,
          contact: {
            displayName: fullName === null ? username : name + ' ' + lastName,
            uuid: uuid
          },
        };
        //newInfo.contact.uuid = uuid;
        //newInfo.contact.displayName = fullName === null ? username : name + ' ' + lastName;
        //newInfo.contact.name =
          //fullName === null ? username : name + ' ' + lastName;

        //info.contact.displayName = fullName === null ? username : name + ' ' + lastName;
        //info.contact.name =
          //fullName === null ? username : name + ' ' + lastName;

        
        console.warn('informacion para conversacion :: ', newInfo);
        console.warn('informacion para mensajes :: ', info);
        await this.firestore
          .collection(Collections.CONVERSATIONS)
          .doc(Collections.EMPLOYEES)
          .collection(uuid)
          .doc(contact.uuid)
          .set(info);

        await this.firestore
          .collection(Collections.CONVERSATIONS)
          .doc(Collections.EMPLOYEES)
          .collection(uuid)
          .doc(contact.uuid)
          .collection(Collections.MESSAGES)
          .add(newInfo);

        info.contact.displayName = fullName === null ? username : fullName;
        info.contact.uuid = uuid;

        await this.firestore
          .collection(Collections.CONVERSATIONS)
          .doc(Collections.EMPLOYEES)
          .collection(contact.uuid)
          .doc(uuid)
          .set(info);

        await this.firestore
          .collection(Collections.CONVERSATIONS)
          .doc(Collections.EMPLOYEES)
          .collection(contact.uuid)
          .doc(uuid)
          .collection(Collections.MESSAGES)
          .add(newInfo);

        this.utils.showToast(
          'Mensajes',
          'Se ha enviado correctamente el mensaje',
          'SUCCESS'
        );
      } catch (error) {
        this.utils.showToast('Mensajes', JSON.stringify(error), 'ERROR');
      }
    } else {
      this.utils.showToast(
        'Mensajes',
        'Debes de ingresar un texto antes de enviar un mensaje de texto',
        'WARNING'
      );
    }
  }

  async sendMessageClients(contact: any, text: string) {
    if (text && text.length > 0) {
      const { uuid, name, lastName, fullName, username } =
        this.utils.getSession();
      try {
        const info = {
          contact: { ...contact },
          message: {
            content: {
              text: text,
            },
          },
          dateCreated: this.utils.getFormatDate(),
        };

        const newInfo = info;
        newInfo.contact.uuid = uuid;
        //newInfo.contact.displayName = fullName === null ? username : name + ' ' + lastName;

        console.warn('Send data :: ', info);
        await this.firestore
          .collection(Collections.CONVERSATIONS)
          .doc(Collections.CLIENTS)
          .collection(uuid)
          .doc(contact.uuid)
          .set(info);

        await this.firestore
          .collection(Collections.CONVERSATIONS)
          .doc(Collections.CLIENTS)
          .collection(uuid)
          .doc(contact.uuid)
          .collection(Collections.MESSAGES)
          .add(newInfo);

        info.contact.displayName =
          fullName === null ? username : name + ' ' + lastName;
        info.contact.uuid = uuid;
        await this.firestore
          .collection(Collections.CONVERSATIONS)
          .doc(Collections.CLIENTS)
          .collection(contact.uuid)
          .doc(uuid)
          .set(info);

        await this.firestore
          .collection(Collections.CONVERSATIONS)
          .doc(Collections.CLIENTS)
          .collection(contact.uuid)
          .doc(uuid)
          .collection(Collections.MESSAGES)
          .add(newInfo);

        this.utils.showToast(
          'Mensajes',
          'Se ha enviado correctamente el mensaje',
          'SUCCESS'
        );
      } catch (error) {
        this.utils.showToast('Mensajes', JSON.stringify(error), 'ERROR');
      }
    } else {
      this.utils.showToast(
        'Mensajes',
        'Debes de ingresar un texto antes de enviar un mensaje de texto',
        'WARNING'
      );
    }
  }
}
