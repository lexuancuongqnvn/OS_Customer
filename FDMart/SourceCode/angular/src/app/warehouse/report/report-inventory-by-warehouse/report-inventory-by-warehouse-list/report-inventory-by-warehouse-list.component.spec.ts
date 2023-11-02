import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInventoryByWarehouseListComponent } from './report-inventory-by-warehouse-list.component';

describe('ReportInventoryByWarehouseListComponent', () => {
  let component: ReportInventoryByWarehouseListComponent;
  let fixture: ComponentFixture<ReportInventoryByWarehouseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInventoryByWarehouseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInventoryByWarehouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
