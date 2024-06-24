import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C12MEditComponent } from './c12-m-edit.component';

describe('C12MEditComponent', () => {
  let component: C12MEditComponent;
  let fixture: ComponentFixture<C12MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C12MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C12MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
