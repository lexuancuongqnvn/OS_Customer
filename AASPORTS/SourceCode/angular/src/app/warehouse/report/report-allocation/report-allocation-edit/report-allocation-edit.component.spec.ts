import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAllocationEditComponent } from './report-allocation-edit.component';

describe('ReportAllocationEditComponent', () => {
  let component: ReportAllocationEditComponent;
  let fixture: ComponentFixture<ReportAllocationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAllocationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAllocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
