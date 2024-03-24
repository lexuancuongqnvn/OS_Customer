import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportI43ListComponent } from './report-i43-list.component';

describe('ReportI43ListComponent', () => {
  let component: ReportI43ListComponent;
  let fixture: ComponentFixture<ReportI43ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportI43ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportI43ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
