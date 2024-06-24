import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryReturnReportComponent } from './inventory-return-report.component';

describe('InventoryReturnReportComponent', () => {
  let component: InventoryReturnReportComponent;
  let fixture: ComponentFixture<InventoryReturnReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryReturnReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryReturnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
