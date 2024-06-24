import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S34MEditComponent } from './s34-m-edit.component';

describe('S34MEditComponent', () => {
  let component: S34MEditComponent;
  let fixture: ComponentFixture<S34MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S34MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S34MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
