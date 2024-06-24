import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsCongfigurationListComponent } from './goods-congfiguration-list.component';

describe('GoodsCongfigurationListComponent', () => {
  let component: GoodsCongfigurationListComponent;
  let fixture: ComponentFixture<GoodsCongfigurationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsCongfigurationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsCongfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
