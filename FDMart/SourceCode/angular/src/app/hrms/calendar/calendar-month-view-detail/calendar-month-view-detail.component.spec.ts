import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMonthViewDetailComponent } from './calendar-month-view-detail.component';

describe('CalendarMonthViewDetailComponent', () => {
  let component: CalendarMonthViewDetailComponent;
  let fixture: ComponentFixture<CalendarMonthViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarMonthViewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMonthViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
