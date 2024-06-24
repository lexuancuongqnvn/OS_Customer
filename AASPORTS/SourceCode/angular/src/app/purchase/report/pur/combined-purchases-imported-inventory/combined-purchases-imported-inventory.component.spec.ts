import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedPurchasesImportedInventoryComponent } from './combined-purchases-imported-inventory.component';

describe('CombinedPurchasesImportedInventoryComponent', () => {
  let component: CombinedPurchasesImportedInventoryComponent;
  let fixture: ComponentFixture<CombinedPurchasesImportedInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinedPurchasesImportedInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinedPurchasesImportedInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
