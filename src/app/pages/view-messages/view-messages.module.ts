import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMessagesPageRoutingModule } from './view-messages-routing.module';

import { ViewMessagesPage } from './view-messages.page';

// Custom Components
import { ChatHeaderComponent } from 'src/app/Components/chat-header/chat-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMessagesPageRoutingModule,
  ],
  declarations: [ViewMessagesPage, ChatHeaderComponent],
})
export class ViewMessagesPageModule {}
