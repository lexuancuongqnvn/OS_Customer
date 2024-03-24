import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTemplateVersionListComponent } from './report-template-version-list.component';

describe('ReportTemplateVersionListComponent', () => {
  let component: ReportTemplateVersionListComponent;
  let fixture: ComponentFixture<ReportTemplateVersionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTemplateVersionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTemplateVersionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
