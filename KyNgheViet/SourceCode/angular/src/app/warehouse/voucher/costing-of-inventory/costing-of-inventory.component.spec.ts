import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostingOfInventoryComponent } from './costing-of-inventory.component';

describe('CostingOfInventoryComponent', () => {
  let component: CostingOfInventoryComponent;
  let fixture: ComponentFixture<CostingOfInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostingOfInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostingOfInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
