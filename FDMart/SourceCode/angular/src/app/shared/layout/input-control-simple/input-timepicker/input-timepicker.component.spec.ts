import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTimepickerComponent } from './input-timepicker.component';

describe('InputTimepickerComponent', () => {
  let component: InputTimepickerComponent;
  let fixture: ComponentFixture<InputTimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTimepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
