import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBlockBeforeLoginComponent } from './check-block-before-login.component';

describe('CheckBlockBeforeLoginComponent', () => {
  let component: CheckBlockBeforeLoginComponent;
  let fixture: ComponentFixture<CheckBlockBeforeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckBlockBeforeLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBlockBeforeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
