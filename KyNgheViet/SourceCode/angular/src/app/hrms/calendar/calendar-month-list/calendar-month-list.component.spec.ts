import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMonthListComponent } from './calendar-month-list.component';

describe('CalendarMonthListComponent', () => {
  let component: CalendarMonthListComponent;
  let fixture: ComponentFixture<CalendarMonthListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarMonthListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMonthListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
