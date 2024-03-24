import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxDataGridEditComponent } from './dx-data-grid-edit.component';

describe('DxDataGridEditComponent', () => {
  let component: DxDataGridEditComponent;
  let fixture: ComponentFixture<DxDataGridEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxDataGridEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxDataGridEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
