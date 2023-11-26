import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayV2ListComponent } from './holiday-v2-list.component';

describe('HolidayV2ListComponent', () => {
  let component: HolidayV2ListComponent;
  let fixture: ComponentFixture<HolidayV2ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayV2ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayV2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
