import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditV2ForPopupComponent } from './form-edit-v2-for-popup.component';

describe('FormEditV2ForPopupComponent', () => {
  let component: FormEditV2ForPopupComponent;
  let fixture: ComponentFixture<FormEditV2ForPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditV2ForPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditV2ForPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
