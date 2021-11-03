import { Component, OnInit } from '@angular/core';
import { SessionModel } from 'src/app/Models/SessionModel';
import { Utilities } from 'src/Utils/Utilities';

// import the service
import { ShopService } from 'src/app/services/Shop/shop.service';
import { FunctionService } from 'src/Utils/FunctionService';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  Session: SessionModel = <SessionModel>{};
  iconPassword: string = 'eye-off-outline';
  inputType: string = 'password';
  constructor(
    public utils: Utilities,
    public shopService: ShopService,
    public events: FunctionService
  ) {}

  ngOnInit() {}

  async signIn() {
    let error = false,
      message = '';

    if (!this.Session.username && !this.Session.password) {
      error = true;
      message =
        'Ups! debes de ingresar tu nombre de usuario y contrasenia para poder ingresar';
    }

    if (!this.Session.username) {
      error = true;
      message =
        'Ups! debes de ingresar tu nombre de usuario para poder ingresar';
    }

    if (!this.Session.password) {
      error = true;
      message = 'Ups! debes de ingresar tu contrasenia para poder ingresar';
    }

    if (error) {
      this.utils.showToast('Iniciar sesion', message, 'ERROR');
      return null;
    }

    try {
      this.utils.showLoading('Cargando...');
      const requestSignIn = await this.shopService.signIn(this.Session);
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
}
