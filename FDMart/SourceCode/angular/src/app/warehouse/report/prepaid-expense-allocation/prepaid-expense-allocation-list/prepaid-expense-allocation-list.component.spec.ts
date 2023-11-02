import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidExpenseAllocationListComponent } from './prepaid-expense-allocation-list.component';

describe('PrepaidExpenseAllocationListComponent', () => {
  let component: PrepaidExpenseAllocationListComponent;
  let fixture: ComponentFixture<PrepaidExpenseAllocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaidExpenseAllocationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaidExpenseAllocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
