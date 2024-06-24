import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingVoucherListComponent } from './accounting-voucher-list.component';

describe('AccountingVoucherListComponent', () => {
  let component: AccountingVoucherListComponent;
  let fixture: ComponentFixture<AccountingVoucherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingVoucherListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingVoucherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
