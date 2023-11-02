import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I43MEditComponent } from './i43-m-edit.component';

describe('I43MEditComponent', () => {
  let component: I43MEditComponent;
  let fixture: ComponentFixture<I43MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I43MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I43MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
