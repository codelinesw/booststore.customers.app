import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-store',
  templateUrl: './view-store.page.html',
  styleUrls: ['./view-store.page.scss'],
})
export class ViewStorePage implements OnInit {

  selectedTab: any = 0;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  selectTab($event,tab: number){

  }

  goToPage(page: string){
    this.router.navigate([page]);
  }

}
