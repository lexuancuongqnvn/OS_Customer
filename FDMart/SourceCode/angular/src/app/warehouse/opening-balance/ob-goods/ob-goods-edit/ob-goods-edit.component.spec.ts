import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObGoodsEditComponent } from './ob-goods-edit.component';

describe('ObGoodsEditComponent', () => {
  let component: ObGoodsEditComponent;
  let fixture: ComponentFixture<ObGoodsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObGoodsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObGoodsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
