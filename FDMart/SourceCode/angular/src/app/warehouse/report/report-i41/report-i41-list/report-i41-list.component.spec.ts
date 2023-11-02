import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportI41ListComponent } from './report-i41-list.component';

describe('ReportI41ListComponent', () => {
  let component: ReportI41ListComponent;
  let fixture: ComponentFixture<ReportI41ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportI41ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportI41ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
