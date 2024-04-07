import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarryForwardExecuteComponent } from './carry-forward-execute.component';

describe('CarryForwardExecuteComponent', () => {
  let component: CarryForwardExecuteComponent;
  let fixture: ComponentFixture<CarryForwardExecuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarryForwardExecuteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarryForwardExecuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
