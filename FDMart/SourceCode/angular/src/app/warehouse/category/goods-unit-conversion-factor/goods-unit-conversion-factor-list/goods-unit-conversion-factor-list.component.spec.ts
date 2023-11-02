import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsUnitConversionFactorListComponent } from './goods-unit-conversion-factor-list.component';

describe('GoodsUnitConversionFactorListComponent', () => {
  let component: GoodsUnitConversionFactorListComponent;
  let fixture: ComponentFixture<GoodsUnitConversionFactorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsUnitConversionFactorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsUnitConversionFactorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
