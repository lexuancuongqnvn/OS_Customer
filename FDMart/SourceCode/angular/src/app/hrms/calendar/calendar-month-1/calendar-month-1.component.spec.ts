import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMonth1Component } from './calendar-month-1.component';

describe('CalendarMonth1Component', () => {
  let component: CalendarMonth1Component;
  let fixture: ComponentFixture<CalendarMonth1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarMonth1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMonth1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
