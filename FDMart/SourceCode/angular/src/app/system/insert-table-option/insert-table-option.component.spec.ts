import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTableOptionComponent } from './insert-table-option.component';

describe('InsertTableOptionComponent', () => {
  let component: InsertTableOptionComponent;
  let fixture: ComponentFixture<InsertTableOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertTableOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertTableOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
