import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarryForwardEditComponent } from './carry-forward-edit.component';

describe('CarryForwardEditComponent', () => {
  let component: CarryForwardEditComponent;
  let fixture: ComponentFixture<CarryForwardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarryForwardEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarryForwardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
