import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowManagementAddEditComponent } from './workflow-management-add-edit.component';

describe('WorkflowManagementAddEditComponent', () => {
  let component: WorkflowManagementAddEditComponent;
  let fixture: ComponentFixture<WorkflowManagementAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowManagementAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowManagementAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
