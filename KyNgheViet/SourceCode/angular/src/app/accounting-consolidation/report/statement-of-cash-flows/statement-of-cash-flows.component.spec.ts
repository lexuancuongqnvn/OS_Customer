import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementOfCashFlowsComponent } from './statement-of-cash-flows.component';

describe('StatementOfCashFlowsComponent', () => {
  let component: StatementOfCashFlowsComponent;
  let fixture: ComponentFixture<StatementOfCashFlowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementOfCashFlowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementOfCashFlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
