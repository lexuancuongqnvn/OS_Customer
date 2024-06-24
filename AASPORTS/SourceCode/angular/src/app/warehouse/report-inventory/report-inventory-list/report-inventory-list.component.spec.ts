import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInventoryListComponent } from './report-inventory-list.component';

describe('ReportInventoryListComponent', () => {
  let component: ReportInventoryListComponent;
  let fixture: ComponentFixture<ReportInventoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInventoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
