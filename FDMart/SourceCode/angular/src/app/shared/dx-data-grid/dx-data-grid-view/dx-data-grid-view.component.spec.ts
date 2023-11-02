import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DXDataGridViewComponent } from './dx-data-grid-view.component';

describe('DXDataGridViewComponent', () => {
  let component: DXDataGridViewComponent;
  let fixture: ComponentFixture<DXDataGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DXDataGridViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DXDataGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
