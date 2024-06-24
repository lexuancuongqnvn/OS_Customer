import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTableOptionEditComponent } from './insert-table-option-edit.component';

describe('InsertTableOptionEditComponent', () => {
  let component: InsertTableOptionEditComponent;
  let fixture: ComponentFixture<InsertTableOptionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertTableOptionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertTableOptionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
