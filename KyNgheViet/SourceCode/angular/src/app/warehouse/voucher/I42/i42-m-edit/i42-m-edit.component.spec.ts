import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I42MEditComponent } from './i42-m-edit.component';

describe('I42MEditComponent', () => {
  let component: I42MEditComponent;
  let fixture: ComponentFixture<I42MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I42MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I42MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
