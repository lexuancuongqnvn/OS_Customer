import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C16MEditComponent } from './c16-m-edit.component';

describe('C16MEditComponent', () => {
  let component: C16MEditComponent;
  let fixture: ComponentFixture<C16MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C16MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C16MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
