import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTemplateVersionEditComponent } from './report-template-version-edit.component';

describe('ReportTemplateVersionEditComponent', () => {
  let component: ReportTemplateVersionEditComponent;
  let fixture: ComponentFixture<ReportTemplateVersionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTemplateVersionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTemplateVersionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
