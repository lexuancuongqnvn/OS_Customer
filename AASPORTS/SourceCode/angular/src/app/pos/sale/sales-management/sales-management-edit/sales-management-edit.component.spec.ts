import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesManagementEditComponent } from './sales-management-edit.component';

describe('SalesManagementEditComponent', () => {
  let component: SalesManagementEditComponent;
  let fixture: ComponentFixture<SalesManagementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesManagementEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesManagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
