import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceWarningComponent } from './face-warning.component';

describe('FaceWarningComponent', () => {
  let component: FaceWarningComponent;
  let fixture: ComponentFixture<FaceWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
