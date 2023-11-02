import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFilepickerComponent } from './input-filepicker.component';

describe('InputFilepickerComponent', () => {
  let component: InputFilepickerComponent;
  let fixture: ComponentFixture<InputFilepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFilepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFilepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
