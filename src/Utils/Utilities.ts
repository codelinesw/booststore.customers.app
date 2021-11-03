import {
  AlertController,
  LoadingController,
  NavController,
  Platform,
  ToastController,
  
} from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ShopModel } from 'src/app/Models/ShopModel';
import { SessionModel } from 'src/app/Models/SessionModel';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root',
})
export class Utilities {
  hide: boolean = false;
  expreLetters = /^[A-Z\s]+$/i;
  expreNumber = /^([0-9])*$/;
  expreEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public toastController: ToastController,
    private platform: Platform
  ) {}

  goToPage(page: string, params?: any): void {
    console.log('Go to Page :: ', page);
    this.router.navigate([page], { queryParams: { ...params } });
  }

  async customAlert(
    title?: string,
    message?: string,
    action?: any,
    controls?: any
  ) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      cssClass: 'my-custom-alert',
      buttons: !controls
        ? [
            {
              text: 'Ok',
              handler: () => {
                if (action) {
                  action();
                }
              },
            },
          ]
        : controls,
      backdropDismiss: false,
    });
    await alert.present();
  }

  async showLoading(mensaje: string) {
    this.hide = false;
    await this.loadingController
      .create({
        message: mensaje,
      })
      .then((load) => {
        load.present();
        if (this.hide) {
          load.dismiss();
        }
      });
  }

  async hideLoader() {
    try {
      if (this.loadingController.getTop() == undefined) return;
      console.log('top');
      this.hide = true;
      await this.loadingController.dismiss();
    } catch (e) {
      console.log('hideLoader', e);
    }
  }

  async presentToast(message?: string) {
    const toast = await this.toastController.create({
      message: message ? message : 'Your settings have been saved.',
      duration: 10000,
    });
    toast.present();
  }

  addTwodigitFormat(cadena: string) {
    if (cadena && cadena.length < 2) {
      return `0${cadena}`;
    }
    return cadena;
  }

  getFormatDate(date?: string): string {
    let localDate = !date ? new Date() : new Date(date);
    console.warn('current Date ', localDate.getMonth() + ' ' + date);
    return `${localDate.getFullYear()}-${this.addTwodigitFormat(
      (localDate.getMonth() + 1).toString()
    )}-${this.addTwodigitFormat(
      localDate.getDate().toString()
    )} ${this.addTwodigitFormat(
      localDate.getHours().toString()
    )}:${this.addTwodigitFormat(
      localDate.getMinutes().toString()
    )}:${this.addTwodigitFormat(localDate.getSeconds().toString())}`;
  }

  addCurrencyFormat(amount: string, currency?: string) {
    const currencyFormatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency ? currency : 'COP',
    });
    return amount.trim() === ''
      ? '0'
      : currencyFormatter.format(parseFloat(amount));
  }

  setCurrencyFormat(amount: string, currency?: string) {
    console.log('format value :: ', amount.replace(/\./g, '').trim());
    return amount && parseInt(amount) > 0
      ? amount
          .replace(/\./g, '')
          .trim()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      : '0.0';
  }

  currencyString(value: number, decimals: number) {
    return Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }
  // convert image to base64
  fileToBase64(fileImage: File): Promise<{}> {
    return new Promise((resolve, reject) => {
      let fileReader: FileReader = new FileReader();
      if (fileReader && fileImage != null) {
        fileReader.readAsDataURL(fileImage);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error('No file found'));
      }
    });
  }

  // functions are for validate fields
  extensionValidation(fileName, extensions: string[]): boolean {
    let file_ = fileName != '' ? fileName : '';
    if (file_ != '') {
      let extension_file = file_.trim().split('.');
      extension_file = extension_file[extension_file.length - 1];
      let valid_extensions = extensions;
      if (valid_extensions.includes(extension_file)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  validateOnlyLetter($event): void {
    const pattern = new RegExp(this.expreLetters, 'i');
    if (!pattern.test($event.key)) {
      $event.preventDefault();
    }
  }

  validateOnlyNumber($event, needAddCurrencyFormat?: boolean): void {
    const pattern = new RegExp(this.expreNumber, 'i');
    if (!pattern.test($event.key)) {
      $event.preventDefault();
      //return null;
    }
  }

  validateEmail(email): Boolean {
    const pattern = new RegExp(this.expreEmail, 'i');
    if (!pattern.test(email)) {
      return false;
    }
    return true;
  }

  saveFirstShopinfo(information: ShopModel): Boolean {
    try {
      localStorage.setItem('firstInformation', JSON.stringify(information));
      return true;
    } catch (error) {
      console.log('Error :: ', error);
    }
    return false;
  }

  async getFirstShopinfo(): Promise<ShopModel> {
    try {
      return JSON.parse(localStorage.getItem('firstInformation'));
    } catch (error) {
      console.log('Error :: ', error);
    }
    return null;
  }

  saveSession(information: any): Boolean {
    try {
      localStorage.setItem('shopUser', JSON.stringify(information));
      return true;
    } catch (error) {
      console.log('Error :: ', error);
    }
    return false;
  }

  getSession() {
    try {
      let data = localStorage.getItem('shopUser');
      return data === null ? undefined : JSON.parse(data);
    } catch (error) {
      console.log('Error :: ', error);
    }
    return undefined;
  }

  setSession(information: any): Boolean {
    try {
      let data = localStorage.getItem('shopUser');
      if (data === null) {
        localStorage.setItem('shopUser', data);
      } else {
        let newInfo = { ...JSON.parse(data), ...information };
        console.error('Newinfo...', newInfo);
        localStorage.setItem('shopUser', JSON.stringify(newInfo));
      }
    } catch (error) {
      console.log('Error :: ', error);
    }
    return false;
  }

  protectRoute(): boolean {
    if (this.getSession()) {
      return true;
    }
    return false;
  }

  removeSession(): Boolean {
    try {
      localStorage.removeItem('shopUser');
      return true;
    } catch (error) {
      console.log('Error :: ', error);
      return false;
    }
    return false;
  }

  saveProgress(information: ShopModel): Boolean {
    try {
      localStorage.setItem('shopRegister', JSON.stringify(information));
      return true;
    } catch (error) {
      console.log('Error :: ', error);
    }
    return false;
  }

  async getProgress(): Promise<ShopModel> {
    try {
      return JSON.parse(localStorage.getItem('shopRegister'));
    } catch (error) {
      console.log('Error :: ', error);
    }
    return null;
  }

  setCurrentUserChat(information: any): Boolean {
    try {
      localStorage.setItem('userChat', JSON.stringify(information));
      return true;
    } catch (error) {
      console.log('Error :: ', error);
    }
    return false;
  }

  getCurrentUserChat() {
    try {
      let data = localStorage.getItem('userChat');
      return data === null ? undefined : JSON.parse(data);
    } catch (error) {
      console.log('Error :: ', error);
    }
    return undefined;
  }

  setCurrentPage(page: string): Boolean {
    try {
      localStorage.setItem('currentPage', JSON.stringify(page));
      return true;
    } catch (error) {
      console.log('Error :: ', error);
    }
    return false;
  }

  getCurrentPage(): string {
    try {
      return JSON.parse(localStorage.getItem('currentPage'));
    } catch (error) {
      console.log('Error :: ', error);
    }
    return null;
  }

  showToast(title?: string, message?: string, type?: string) {
    let toast = document.getElementById('custom-toast'),
      toastIcon = document.getElementById('toastIcon');
    toast.classList.remove('success');
    toast.classList.remove('error');
    toast.classList.remove('warning');

    if (type === 'SUCCESS') {
      toast.classList.add('success');
      toastIcon.setAttribute('name', 'checkmark-done-circle-outline');
    }

    if (type === 'ERROR') {
      toast.classList.add('error');
      toastIcon.setAttribute('name', 'bug-outline');
    }

    if (type === 'WARNING') {
      toast.classList.add('warning');
      toastIcon.setAttribute('name', 'alert-circle-outline');
    }

    if (type === 'INFO') {
      toast.classList.add('info');
      toastIcon.setAttribute('name', 'information-circle-outline');
    }

    if (toast) {
      toast.classList.add('show');
      if (title) {
        toast.children[1].children[0].textContent = title;
      }
      if (message) {
        toast.children[1].children[1].textContent = message;
      }
      setTimeout(() => toast.classList.remove('show'), 6000);
    }
  }

  action($event, item) {
    let submenu = $event.target.parentNode.children[1];
    if (submenu) {
      submenu.classList.toggle('active');
    }
  }

  addAnimation($event, showSubmenu?: boolean) {
    if (showSubmenu) {
      document.getElementById('subMenuOptions').classList.add('active');
    }

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

  getLatitude(): number {
    return 3.4197032;
  }

  getLongitude(): number {
    return -76.5064186;
  }

  getCurrentTime(currentDate: string) {
    let date = new Date(currentDate);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  addZero(number: number): string {
    return number < 10 ? `0${number}` : number.toString();
  }

  getCurrentTimeAvailability(
    time: string,
    openingH?: boolean,
    closingTime?: boolean
  ) {
    let date = new Date();
    if (time.includes('-')) {
      if (time.includes('T')) {
        time = time.replace('T', ' ');
      }
      date = new Date(time);
      let tmpTime = time.split('T');
      if (tmpTime.length > 0) {
        console.log('TmpTime ', tmpTime);
         if (openingH || closingTime) {
          const { openingHours, closingTime } = this.getSession();
          let tmpHours = openingH
            ? openingHours.split(':')
            : closingTime.split(':');
          date.setHours(
            parseInt(tmpHours[0]),
            parseInt(tmpHours[1]),
            parseInt(tmpHours[2])
          );
         } else {
          
         }        
      }
      return this.getFormatDate(date.toString());
    }
    return `${date.getFullYear()}-${this.addZero(
      date.getMonth() + 1
    )}-${this.addZero(date.getDate())} ${time}`;
  }

  getHours(time: string): string {
    let splitHours = time.split(':');
    let format = parseInt(splitHours[0]) >= 12 ? 'pm' : 'am';
    return `${splitHours[0]} ${format}`;
  }

  getFormatTime(date: string) {
    let fecha = new Date(date);
    console.warn(fecha);
    return `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
  }

  getDaysInMonth(year: number, month: number) {
    console.error(`Year -> ${year} , month -> ${month}`);
    return new Date(year, month, 0).getDate();
  }

  getLastDayMonth(date: Date) {
    let lastDay = this.getDaysInMonth(date.getFullYear(), date.getMonth() + 1);
    return `${date.getFullYear()}-${this.addZero(
      date.getMonth() + 1
    )}-${lastDay} 23:59:59`;
  }

  getFirstDayMonth(date: Date) {
    return `${date.getFullYear()}-${this.addZero(
      date.getMonth() + 1
    )}-01 00:00:00`;
  }

  isWeb() {
    if (this.platform.is('android') || this.platform.is('ios')) {
      return false;
    }

    return true;
  }
  isAndroid() {
    if (this.platform.is('android')) {
      return true;
    }

    return false;
  }
  isIOS() {
    if (this.platform.is('ios')) {
      return true;
    }

    return false;
  }
  isCordova() {
    if(this.platform.is('cordova')){
      return true;
    }

    return false;
  }

}

