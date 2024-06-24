import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportI42ListComponent } from './report-i42-list.component';

describe('ReportI42ListComponent', () => {
  let component: ReportI42ListComponent;
  let fixture: ComponentFixture<ReportI42ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportI42ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportI42ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
