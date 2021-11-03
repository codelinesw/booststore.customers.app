import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss'],
})
export class HeaderSectionComponent implements OnInit {
  
  @Input() goToPage: string;
  @Input() title: string;

  constructor(private router: Router) {}

  ngOnInit() {}

  goBack(page?:string): void { 
    let currentPage = !page ? this.goToPage : page;
    this.router.navigate([currentPage])
  }

}
