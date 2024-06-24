import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObCustomerEditComponent } from './ob-customer-edit.component';

describe('ObCustomerEditComponent', () => {
  let component: ObCustomerEditComponent;
  let fixture: ComponentFixture<ObCustomerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObCustomerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObCustomerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
