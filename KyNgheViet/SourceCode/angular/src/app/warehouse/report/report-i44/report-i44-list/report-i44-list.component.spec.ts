import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportI44ListComponent } from './report-i44-list.component';

describe('ReportI44ListComponent', () => {
  let component: ReportI44ListComponent;
  let fixture: ComponentFixture<ReportI44ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportI44ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportI44ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
