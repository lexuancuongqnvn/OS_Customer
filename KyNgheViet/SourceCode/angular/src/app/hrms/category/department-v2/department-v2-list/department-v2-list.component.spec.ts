import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentV2ListComponent } from './department-v2-list.component';

describe('DepartmentV2ListComponent', () => {
  let component: DepartmentV2ListComponent;
  let fixture: ComponentFixture<DepartmentV2ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentV2ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentV2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
