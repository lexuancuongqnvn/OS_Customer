import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatePrintImportSlipsAtCostComponent } from './aggregate-print-import-slips-at-cost.component';

describe('AggregatePrintImportSlipsAtCostComponent', () => {
  let component: AggregatePrintImportSlipsAtCostComponent;
  let fixture: ComponentFixture<AggregatePrintImportSlipsAtCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatePrintImportSlipsAtCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatePrintImportSlipsAtCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
