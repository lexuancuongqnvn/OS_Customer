import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOfGoodsReturnNoteListComponent } from './report-of-goods-return-note-list.component';

describe('ReportOfGoodsReturnNoteListComponent', () => {
  let component: ReportOfGoodsReturnNoteListComponent;
  let fixture: ComponentFixture<ReportOfGoodsReturnNoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOfGoodsReturnNoteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOfGoodsReturnNoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
