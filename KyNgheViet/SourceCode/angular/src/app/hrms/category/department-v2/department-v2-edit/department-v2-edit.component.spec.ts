import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentV2EditComponent } from './department-v2-edit.component';

describe('DepartmentV2EditComponent', () => {
  let component: DepartmentV2EditComponent;
  let fixture: ComponentFixture<DepartmentV2EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentV2EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentV2EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
