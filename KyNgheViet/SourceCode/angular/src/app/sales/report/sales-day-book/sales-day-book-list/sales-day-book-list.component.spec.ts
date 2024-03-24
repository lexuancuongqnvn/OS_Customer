import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDayBookListComponent } from './sales-day-book-list.component';

describe('SalesDayBookListComponent', () => {
  let component: SalesDayBookListComponent;
  let fixture: ComponentFixture<SalesDayBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesDayBookListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDayBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
