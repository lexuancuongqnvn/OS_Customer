import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnInfoListComponent } from './column-info-list.component';

describe('ColumnInfoListComponent', () => {
  let component: ColumnInfoListComponent;
  let fixture: ComponentFixture<ColumnInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnInfoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
