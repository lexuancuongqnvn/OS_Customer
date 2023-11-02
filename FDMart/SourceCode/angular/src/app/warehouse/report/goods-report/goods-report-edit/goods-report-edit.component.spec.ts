import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReportEditComponent } from './goods-report-edit.component';

describe('GoodsReportEditComponent', () => {
  let component: GoodsReportEditComponent;
  let fixture: ComponentFixture<GoodsReportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsReportEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
