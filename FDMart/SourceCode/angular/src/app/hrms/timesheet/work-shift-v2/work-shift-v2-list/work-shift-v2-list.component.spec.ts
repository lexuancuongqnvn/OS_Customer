import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkShiftV2ListComponent } from './work-shift-v2-list.component';

describe('WorkShiftV2ListComponent', () => {
  let component: WorkShiftV2ListComponent;
  let fixture: ComponentFixture<WorkShiftV2ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkShiftV2ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkShiftV2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
