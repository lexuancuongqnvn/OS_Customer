import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObGoodsViewComponent } from './ob-goods-view.component';

describe('ObGoodsViewComponent', () => {
  let component: ObGoodsViewComponent;
  let fixture: ComponentFixture<ObGoodsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObGoodsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObGoodsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
