import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
})
export class ChatHeaderComponent implements OnInit {
  @Input() userAvatar: string;
  @Input() nameUser: string;
  @Input() userUuid: string;
  selectedUser: any = {};
  constructor(public router: Router) {}

  ngOnInit() {}

  // ionViewWillEnter() {
  //   if (this.utils.getSession()) {
  //     const { uuidUser, nameUser } = this.utils.getCurrentUserChat();
  //     console.log('Info :: ', uuidUser);
  //     this.selectedUser.uuid = uuidUser;
  //     this.selectedUser.name = nameUser;
  //   }
  // }

  goBack(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
