import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsCongfigurationComponent } from './goods-congfiguration.component';

describe('GoodsCongfigurationComponent', () => {
  let component: GoodsCongfigurationComponent;
  let fixture: ComponentFixture<GoodsCongfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsCongfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsCongfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
