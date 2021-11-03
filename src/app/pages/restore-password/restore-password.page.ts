import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

// impor the utilities
import { Utilities } from "src/Utils/Utilities";

// import the services
import { UserService } from 'src/app/services/User/user.service';
import { Status } from 'src/app/Models/Status';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.page.html',
  styleUrls: ['./restore-password.page.scss'],
})
export class RestorePasswordPage implements OnInit {
  username: string;

  constructor(
    private userService: UserService,
    private platform: Platform,
    public utils: Utilities
  ) {}

  ngOnInit() {}

  async sendRequest() {
    let error = false,
      message = '';

    if (!this.username || (this.username && this.username.trim().length == 0)) {
      error = true;
      message =
        'Ups! Debes de ingresar un usuario para modificar sus credenciales';
    }

    if (error) {
      this.utils.showToast('Cambio de contraseña', message, 'ERROR');
      return false;
    }

    try {
      this.utils.showLoading("Cargando...");
      const requestCPassword = await this.userService.restore({
        username: this.username,
      });
      const responseRCPassword = await requestCPassword.json();
      this.utils.hideLoader();
      let status = responseRCPassword.state == "ERROR" ? "FAILED" : "SUCCESS";
      console.error('Error ', status);
      setTimeout(() => {
        this.utils.showToast(
          'Cambio de contraseña',
          responseRCPassword.message,
          responseRCPassword.state
        );
      }, 200);
      this.utils.goToPage('/signin');
    } catch (error) {
      this.utils.hideLoader();
      this.utils.showToast('Cambio de contraseña', error, 'ERROR');
    }
  }
}
