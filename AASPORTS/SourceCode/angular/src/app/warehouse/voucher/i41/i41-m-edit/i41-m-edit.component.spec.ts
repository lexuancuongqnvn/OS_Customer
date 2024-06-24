import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I41MEditComponent } from './i41-m-edit.component';

describe('I41MEditComponent', () => {
  let component: I41MEditComponent;
  let fixture: ComponentFixture<I41MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I41MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I41MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
