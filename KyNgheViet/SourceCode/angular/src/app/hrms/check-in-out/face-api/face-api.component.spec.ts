import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceApiComponent } from './face-api.component';

describe('FaceApiComponent', () => {
  let component: FaceApiComponent;
  let fixture: ComponentFixture<FaceApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
