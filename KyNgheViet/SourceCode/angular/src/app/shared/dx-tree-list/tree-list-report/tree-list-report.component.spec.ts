import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeListReportComponent } from './tree-list-report.component';

describe('TreeListReportComponent', () => {
  let component: TreeListReportComponent;
  let fixture: ComponentFixture<TreeListReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeListReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
