import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportInvoiceReportComponent } from './import-invoice-report.component';

describe('ImportInvoiceReportComponent', () => {
  let component: ImportInvoiceReportComponent;
  let fixture: ComponentFixture<ImportInvoiceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportInvoiceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportInvoiceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
