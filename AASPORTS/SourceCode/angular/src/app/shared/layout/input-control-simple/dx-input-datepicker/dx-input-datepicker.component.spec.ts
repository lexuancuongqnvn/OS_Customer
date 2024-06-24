import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxInputDatepickerComponent } from './dx-input-datepicker.component';

describe('DxInputDatepickerComponent', () => {
  let component: DxInputDatepickerComponent;
  let fixture: ComponentFixture<DxInputDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxInputDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxInputDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
