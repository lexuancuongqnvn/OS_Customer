import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMaterialsReportListComponent } from './inventory-materials-report-list.component';

describe('InventoryMaterialsReportListComponent', () => {
  let component: InventoryMaterialsReportListComponent;
  let fixture: ComponentFixture<InventoryMaterialsReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryMaterialsReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMaterialsReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
