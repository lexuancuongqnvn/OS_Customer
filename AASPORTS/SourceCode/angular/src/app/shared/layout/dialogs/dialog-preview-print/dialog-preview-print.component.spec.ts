import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPreviewPrintComponent } from './dialog-preview-print.component';

describe('DialogPreviewPrintComponent', () => {
  let component: DialogPreviewPrintComponent;
  let fixture: ComponentFixture<DialogPreviewPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPreviewPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPreviewPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
