import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowManagementViewDetailComponent } from './workflow-management-view-detail.component';

describe('WorkflowManagementViewDetailComponent', () => {
  let component: WorkflowManagementViewDetailComponent;
  let fixture: ComponentFixture<WorkflowManagementViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowManagementViewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowManagementViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
