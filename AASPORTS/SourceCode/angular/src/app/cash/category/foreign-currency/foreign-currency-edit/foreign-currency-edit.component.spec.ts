import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignCurrencyEditComponent } from './foreign-currency-edit.component';

describe('ForeignCurrencyEditComponent', () => {
  let component: ForeignCurrencyEditComponent;
  let fixture: ComponentFixture<ForeignCurrencyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForeignCurrencyEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignCurrencyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
