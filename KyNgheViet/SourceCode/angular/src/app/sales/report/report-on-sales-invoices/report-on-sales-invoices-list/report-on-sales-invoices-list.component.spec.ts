import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOnSalesInvoicesListComponent } from './report-on-sales-invoices-list.component';

describe('ReportOnSalesInvoicesListComponent', () => {
  let component: ReportOnSalesInvoicesListComponent;
  let fixture: ComponentFixture<ReportOnSalesInvoicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOnSalesInvoicesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOnSalesInvoicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
