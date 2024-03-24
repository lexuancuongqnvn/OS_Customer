import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsGroupEditComponent } from './goods-group-edit.component';

describe('GoodsGroupEditComponent', () => {
  let component: GoodsGroupEditComponent;
  let fixture: ComponentFixture<GoodsGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsGroupEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
