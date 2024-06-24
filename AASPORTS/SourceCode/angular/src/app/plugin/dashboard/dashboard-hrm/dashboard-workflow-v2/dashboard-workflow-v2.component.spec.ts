import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWorkflowV2Component } from './dashboard-workflow-v2.component';

describe('DashboardWorkflowV2Component', () => {
  let component: DashboardWorkflowV2Component;
  let fixture: ComponentFixture<DashboardWorkflowV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardWorkflowV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWorkflowV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
