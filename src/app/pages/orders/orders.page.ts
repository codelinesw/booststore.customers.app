import { Component, OnInit } from '@angular/core';
import { Utilities } from 'src/Utils/Utilities';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  constructor(private utils: Utilities) {}

  ngOnInit() {}

  deleteRow(item) {
    
  }
}
