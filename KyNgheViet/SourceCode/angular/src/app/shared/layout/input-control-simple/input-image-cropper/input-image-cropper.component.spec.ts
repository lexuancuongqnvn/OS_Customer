import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputImageCropperComponent } from './input-image-cropper.component';

describe('InputImageCropperComponent', () => {
  let component: InputImageCropperComponent;
  let fixture: ComponentFixture<InputImageCropperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputImageCropperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputImageCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
