import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInventoryBookDetailListComponent } from './report-inventory-book-detail-list.component';

describe('ReportInventoryBookDetailListComponent', () => {
  let component: ReportInventoryBookDetailListComponent;
  let fixture: ComponentFixture<ReportInventoryBookDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInventoryBookDetailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInventoryBookDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
