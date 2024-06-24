import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarryForwardListComponent } from './carry-forward-list.component';

describe('CarryForwardListComponent', () => {
  let component: CarryForwardListComponent;
  let fixture: ComponentFixture<CarryForwardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarryForwardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarryForwardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
