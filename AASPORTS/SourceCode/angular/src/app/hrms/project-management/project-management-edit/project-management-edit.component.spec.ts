import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementEditComponent } from './project-management-edit.component';

describe('ProjectManagementEditComponent', () => {
  let component: ProjectManagementEditComponent;
  let fixture: ComponentFixture<ProjectManagementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectManagementEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
