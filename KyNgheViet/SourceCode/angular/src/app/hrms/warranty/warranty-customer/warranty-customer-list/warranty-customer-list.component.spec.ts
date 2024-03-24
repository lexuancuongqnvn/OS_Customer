import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyCustomerListComponent } from './warranty-customer-list.component';

describe('WarrantyCustomerListComponent', () => {
  let component: WarrantyCustomerListComponent;
  let fixture: ComponentFixture<WarrantyCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrantyCustomerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
