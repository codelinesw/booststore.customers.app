import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopUpWarehouseSupplyComponent } from './pop-up-warehouse-supply.page';

describe('PopUpWarehouseSupplyComponent', () => {
  let component: PopUpWarehouseSupplyComponent;
  let fixture: ComponentFixture<PopUpWarehouseSupplyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpWarehouseSupplyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopUpWarehouseSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
