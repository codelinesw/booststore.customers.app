import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

// impor the utilities
import { Utilities } from "src/Utils/Utilities";

// import the services
import { UserService } from 'src/app/services/User/user.service';
import { Status } from 'src/app/Models/Status';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  // states
  password: string;
  repeatPassword: string;
  token: string;
  iconPassword: string = 'eye-off-outline';
  inputType: string = 'password';

  iconRPassword: string = 'eye-off-outline';
  inputTypeRP: string = 'password';

  constructor(
    public utils: Utilities,
    private router: Router,
    private userService: UserService,
    private platform: Platform
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.platform.getQueryParam('token')) {
      this.token = this.platform.getQueryParam('token');
    }
  }

  async changePassword() {
    let error = false,
      message = '';

    if (!this.password || (this.password && this.password.trim().length == 0)) {
      error = true;
      message =
        'Ups! Debes de ingresar una nueva contraseña para actualizar tus credenciales';
    }

    if (!this.repeatPassword || this.password !== this.repeatPassword) {
      error = true;
      message =
        'Las contraseña no coinciden, por favor variquelas y intente de nuevo';
    }

    if (error) {
      this.utils.showToast('Cambio de contraseña', message, 'ERROR');
      return false;
    }

    try {
      this.utils.showLoading('Cargando...');
      const requestCPassword = await this.userService.changePassword({
        token: this.token,
        password: this.password,
      });
      const responseRCPassword = await requestCPassword.json();
      this.utils.hideLoader();
      setTimeout(() => {
        this.utils.showToast(
          'Cambio de contraseña',
          responseRCPassword.message,
          responseRCPassword.state
        );
      }, 200);
      if (responseRCPassword.state !== 'ERROR') {
        this.utils.goToPage('/signin');
      }
    } catch (error) {
      this.utils.hideLoader();
      this.utils.showToast('Cambio de contraseña', error, 'ERROR');
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

  viewRPassword() {
    if (this.inputTypeRP === 'password') {
      this.iconRPassword = 'eye-outline';
      this.inputTypeRP = 'text';
    } else {
      this.iconRPassword = 'eye-off-outline';
      this.inputTypeRP = 'password';
    }
  }
}
