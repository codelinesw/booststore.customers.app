import { Component, OnInit } from '@angular/core';

// import the utilities
import { Utilities } from "src/Utils/Utilities";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  Options: any[] = [
    {
      option: 'Metodos de pago',
      icon: 'cash-outline',
      description: 'Configura el metodo de pago para esta sede',
      active: true,
    },
    {
      option: 'Copia de seguridad',
      icon: 'cloud-upload-outline',
      description: 'Activa el modo offline',
      active: false,
    },
    {
      option: 'Seguridad',
      icon: 'lock-closed-outline',
      description: 'Cambia la contraseña',
      active: false,
    },
  ];
  currentOption: string = 'Metodos de pago';
  edit: boolean;
  email: string;
  constructor(private utils: Utilities) {}

  ngOnInit() {
    if (this.utils.getSession()) {
      this.email = this.utils.getSession().email;
    }
  }

  enabled() {
    if (!this.edit) {
      this.edit = true;
    } else {
      this.edit = false;
    }
  }

  showSection(option: string) {
    //this.currentOption = option;
  }

  save() {

  }
}
