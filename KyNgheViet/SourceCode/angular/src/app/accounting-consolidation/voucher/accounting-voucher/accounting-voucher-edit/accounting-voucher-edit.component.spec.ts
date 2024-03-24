import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingVoucherEditComponent } from './accounting-voucher-edit.component';

describe('AccountingVoucherEditComponent', () => {
  let component: AccountingVoucherEditComponent;
  let fixture: ComponentFixture<AccountingVoucherEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingVoucherEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingVoucherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
