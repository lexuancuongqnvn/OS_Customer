import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTemplateSignatureEditComponent } from './report-template-signature-edit.component';

describe('ReportTemplateSignatureEditComponent', () => {
  let component: ReportTemplateSignatureEditComponent;
  let fixture: ComponentFixture<ReportTemplateSignatureEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTemplateSignatureEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTemplateSignatureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
