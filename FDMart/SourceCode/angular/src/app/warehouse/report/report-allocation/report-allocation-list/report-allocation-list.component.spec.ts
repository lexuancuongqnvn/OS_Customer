import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAllocationListComponent } from './report-allocation-list.component';

describe('ReportAllocationListComponent', () => {
  let component: ReportAllocationListComponent;
  let fixture: ComponentFixture<ReportAllocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAllocationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAllocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
