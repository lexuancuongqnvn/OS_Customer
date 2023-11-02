import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportI44EditComponent } from './report-i44-edit.component';

describe('ReportI44EditComponent', () => {
  let component: ReportI44EditComponent;
  let fixture: ComponentFixture<ReportI44EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportI44EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportI44EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
