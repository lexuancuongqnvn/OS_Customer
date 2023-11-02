import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsUnitEditComponent } from './goods-unit-edit.component';

describe('GoodsUnitEditComponent', () => {
  let component: GoodsUnitEditComponent;
  let fixture: ComponentFixture<GoodsUnitEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsUnitEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsUnitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
