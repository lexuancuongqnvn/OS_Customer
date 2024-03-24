import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportI42EditComponent } from './report-i42-edit.component';

describe('ReportI42EditComponent', () => {
  let component: ReportI42EditComponent;
  let fixture: ComponentFixture<ReportI42EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportI42EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportI42EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
