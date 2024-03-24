import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsUnitConversionFactorEditComponent } from './goods-unit-conversion-factor-edit.component';

describe('GoodsUnitConversionFactorEditComponent', () => {
  let component: GoodsUnitConversionFactorEditComponent;
  let fixture: ComponentFixture<GoodsUnitConversionFactorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsUnitConversionFactorEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsUnitConversionFactorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
