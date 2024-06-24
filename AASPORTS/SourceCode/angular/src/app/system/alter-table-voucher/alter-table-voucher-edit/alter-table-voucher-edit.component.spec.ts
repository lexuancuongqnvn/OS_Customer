import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterTableVoucherEditComponent } from './alter-table-voucher-edit.component';

describe('AlterTableVoucherEditComponent', () => {
  let component: AlterTableVoucherEditComponent;
  let fixture: ComponentFixture<AlterTableVoucherEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterTableVoucherEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterTableVoucherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
