import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkShiftV2EditComponent } from './work-shift-v2-edit.component';

describe('WorkShiftV2EditComponent', () => {
  let component: WorkShiftV2EditComponent;
  let fixture: ComponentFixture<WorkShiftV2EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkShiftV2EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkShiftV2EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
