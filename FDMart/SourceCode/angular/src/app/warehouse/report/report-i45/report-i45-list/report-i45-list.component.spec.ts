import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportI45ListComponent } from './report-i45-list.component';

describe('ReportI45ListComponent', () => {
  let component: ReportI45ListComponent;
  let fixture: ComponentFixture<ReportI45ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportI45ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportI45ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
