import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportI43EditComponent } from './report-i43-edit.component';

describe('ReportI43EditComponent', () => {
  let component: ReportI43EditComponent;
  let fixture: ComponentFixture<ReportI43EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportI43EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportI43EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
