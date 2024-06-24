import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTemplateSignatureListComponent } from './report-template-signature-list.component';

describe('ReportTemplateSignatureListComponent', () => {
  let component: ReportTemplateSignatureListComponent;
  let fixture: ComponentFixture<ReportTemplateSignatureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTemplateSignatureListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTemplateSignatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
