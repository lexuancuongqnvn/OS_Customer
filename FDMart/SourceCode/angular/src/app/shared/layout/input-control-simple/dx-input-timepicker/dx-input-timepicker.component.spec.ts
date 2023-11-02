import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxInputTimepickerComponent } from './dx-input-timepicker.component';

describe('DxInputTimepickerComponent', () => {
  let component: DxInputTimepickerComponent;
  let fixture: ComponentFixture<DxInputTimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxInputTimepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxInputTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
