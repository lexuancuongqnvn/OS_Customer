import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMonthAddEditComponent } from './calendar-month-add-edit.component';

describe('CalendarMonthAddEditComponent', () => {
  let component: CalendarMonthAddEditComponent;
  let fixture: ComponentFixture<CalendarMonthAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarMonthAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMonthAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
