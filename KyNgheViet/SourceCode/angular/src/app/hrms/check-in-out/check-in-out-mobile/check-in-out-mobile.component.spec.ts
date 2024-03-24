import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInOutMobileComponent } from './check-in-out-mobile.component';

describe('CheckInOutMobileComponent', () => {
  let component: CheckInOutMobileComponent;
  let fixture: ComponentFixture<CheckInOutMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInOutMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInOutMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
