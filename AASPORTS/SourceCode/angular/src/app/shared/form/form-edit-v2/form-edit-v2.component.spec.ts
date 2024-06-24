import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditV2Component } from './form-edit-v2.component';

describe('FormEditV2Component', () => {
  let component: FormEditV2Component;
  let fixture: ComponentFixture<FormEditV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
