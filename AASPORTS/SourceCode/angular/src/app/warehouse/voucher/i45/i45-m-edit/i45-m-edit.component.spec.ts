import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I45MEditComponent } from './i45-m-edit.component';

describe('I45MEditComponent', () => {
  let component: I45MEditComponent;
  let fixture: ComponentFixture<I45MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I45MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I45MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
