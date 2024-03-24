import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxInputDatetimepickerComponent } from './dx-input-datetimepicker.component';

describe('DxInputDatetimepickerComponent', () => {
  let component: DxInputDatetimepickerComponent;
  let fixture: ComponentFixture<DxInputDatetimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxInputDatetimepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxInputDatetimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
