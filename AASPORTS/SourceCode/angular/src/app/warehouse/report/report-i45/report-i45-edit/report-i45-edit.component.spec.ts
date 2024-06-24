import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportI45EditComponent } from './report-i45-edit.component';

describe('ReportI45EditComponent', () => {
  let component: ReportI45EditComponent;
  let fixture: ComponentFixture<ReportI45EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportI45EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportI45EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
