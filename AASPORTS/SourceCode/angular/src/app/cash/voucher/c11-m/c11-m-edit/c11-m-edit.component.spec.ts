import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C11MEditComponent } from './c11-m-edit.component';

describe('C11MEditComponent', () => {
  let component: C11MEditComponent;
  let fixture: ComponentFixture<C11MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C11MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C11MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
