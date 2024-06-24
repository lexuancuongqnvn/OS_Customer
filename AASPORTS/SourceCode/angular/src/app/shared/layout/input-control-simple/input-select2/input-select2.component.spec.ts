import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelect2Component } from './input-select2.component';

describe('InputSelect2Component', () => {
  let component: InputSelect2Component;
  let fixture: ComponentFixture<InputSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSelect2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
