import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C15MEditComponent } from './c15-m-edit.component';

describe('C15MEditComponent', () => {
  let component: C15MEditComponent;
  let fixture: ComponentFixture<C15MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C15MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C15MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
