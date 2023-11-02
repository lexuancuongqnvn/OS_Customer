import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I44MEditComponent } from './i44-m-edit.component';

describe('I44MEditComponent', () => {
  let component: I44MEditComponent;
  let fixture: ComponentFixture<I44MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I44MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I44MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
