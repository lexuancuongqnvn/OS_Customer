import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayV2EditComponent } from './holiday-v2-edit.component';

describe('HolidayV2EditComponent', () => {
  let component: HolidayV2EditComponent;
  let fixture: ComponentFixture<HolidayV2EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayV2EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayV2EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
