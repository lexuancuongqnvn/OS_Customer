import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyWarehouseListComponent } from './warranty-warehouse-list.component';

describe('WarrantyWarehouseListComponent', () => {
  let component: WarrantyWarehouseListComponent;
  let fixture: ComponentFixture<WarrantyWarehouseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrantyWarehouseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyWarehouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
