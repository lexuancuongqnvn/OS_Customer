import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterTableVoucherListComponent } from './alter-table-voucher-list.component';

describe('AlterTableVoucherListComponent', () => {
  let component: AlterTableVoucherListComponent;
  let fixture: ComponentFixture<AlterTableVoucherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterTableVoucherListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterTableVoucherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
