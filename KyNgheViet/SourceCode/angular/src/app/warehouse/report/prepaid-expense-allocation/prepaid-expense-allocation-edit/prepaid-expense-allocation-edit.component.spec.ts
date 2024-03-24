import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidExpenseAllocationEditComponent } from './prepaid-expense-allocation-edit.component';

describe('PrepaidExpenseAllocationEditComponent', () => {
  let component: PrepaidExpenseAllocationEditComponent;
  let fixture: ComponentFixture<PrepaidExpenseAllocationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaidExpenseAllocationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaidExpenseAllocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
