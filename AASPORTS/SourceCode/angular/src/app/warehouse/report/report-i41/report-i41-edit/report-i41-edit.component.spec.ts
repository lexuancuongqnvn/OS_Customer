import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportI41EditComponent } from './report-i41-edit.component';

describe('ReportI41EditComponent', () => {
  let component: ReportI41EditComponent;
  let fixture: ComponentFixture<ReportI41EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportI41EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportI41EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
