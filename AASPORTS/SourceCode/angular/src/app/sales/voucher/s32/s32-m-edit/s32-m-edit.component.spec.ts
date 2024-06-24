import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S32MEditComponent } from './s32-m-edit.component';

describe('S32MEditComponent', () => {
  let component: S32MEditComponent;
  let fixture: ComponentFixture<S32MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S32MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S32MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
