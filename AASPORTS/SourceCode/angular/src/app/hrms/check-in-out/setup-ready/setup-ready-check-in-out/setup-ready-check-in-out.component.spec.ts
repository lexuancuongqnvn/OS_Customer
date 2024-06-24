import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupReadyCheckInOutComponent } from './setup-ready-check-in-out.component';

describe('SetupReadyCheckInOutComponent', () => {
  let component: SetupReadyCheckInOutComponent;
  let fixture: ComponentFixture<SetupReadyCheckInOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupReadyCheckInOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupReadyCheckInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
