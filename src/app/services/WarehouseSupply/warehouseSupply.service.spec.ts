import { TestBed } from '@angular/core/testing';

import { WarehouseSupplyService } from './warehouseSupply.service';

describe('WarehouseSupplyService', () => {
  let service: WarehouseSupplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseSupplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
