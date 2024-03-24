import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowManagementListComponent } from './workflow-management-list.component';

describe('WorkflowManagementListComponent', () => {
  let component: WorkflowManagementListComponent;
  let fixture: ComponentFixture<WorkflowManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowManagementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
