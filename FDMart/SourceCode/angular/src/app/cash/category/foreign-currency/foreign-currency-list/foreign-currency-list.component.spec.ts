import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignCurrencyListComponent } from './foreign-currency-list.component';

describe('ForeignCurrencyListComponent', () => {
  let component: ForeignCurrencyListComponent;
  let fixture: ComponentFixture<ForeignCurrencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForeignCurrencyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignCurrencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
