import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementOfChangesInFinancialPositionComponent } from './statement-of-changes-in-financial-position.component';

describe('StatementOfChangesInFinancialPositionComponent', () => {
  let component: StatementOfChangesInFinancialPositionComponent;
  let fixture: ComponentFixture<StatementOfChangesInFinancialPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementOfChangesInFinancialPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementOfChangesInFinancialPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
