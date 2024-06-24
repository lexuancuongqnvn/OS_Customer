import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObCustomerListComponent } from './ob-customer-list.component';

describe('ObCustomerListComponent', () => {
  let component: ObCustomerListComponent;
  let fixture: ComponentFixture<ObCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObCustomerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
