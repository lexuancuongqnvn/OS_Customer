import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInventoryImportExportListComponent } from './report-inventory-import-export-list.component';

describe('ReportInventoryImportExportListComponent', () => {
  let component: ReportInventoryImportExportListComponent;
  let fixture: ComponentFixture<ReportInventoryImportExportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInventoryImportExportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInventoryImportExportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
