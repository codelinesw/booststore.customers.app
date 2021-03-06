import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestorePasswordPageRoutingModule } from './restore-password-routing.module';

import { RestorePasswordPage } from './restore-password.page';

// Custom Components
import { ComponentsModule } from 'src/app/Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestorePasswordPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [RestorePasswordPage],
})
export class RestorePasswordPageModule {}
