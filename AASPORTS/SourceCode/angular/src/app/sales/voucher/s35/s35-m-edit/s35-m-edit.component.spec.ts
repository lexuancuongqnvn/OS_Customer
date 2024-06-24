import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S35MEditComponent } from './s35-m-edit.component';

describe('S35MEditComponent', () => {
  let component: S35MEditComponent;
  let fixture: ComponentFixture<S35MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S35MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S35MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
