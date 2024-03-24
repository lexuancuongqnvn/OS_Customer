import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnInfoEditComponent } from './column-info-edit.component';

describe('ColumnInfoEditComponent', () => {
  let component: ColumnInfoEditComponent;
  let fixture: ComponentFixture<ColumnInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnInfoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
