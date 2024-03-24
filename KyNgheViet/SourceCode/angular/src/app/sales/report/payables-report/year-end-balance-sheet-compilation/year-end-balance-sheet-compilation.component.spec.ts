import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearEndBalanceSheetCompilationComponent } from './year-end-balance-sheet-compilation.component';

describe('YearEndBalanceSheetCompilationComponent', () => {
  let component: YearEndBalanceSheetCompilationComponent;
  let fixture: ComponentFixture<YearEndBalanceSheetCompilationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearEndBalanceSheetCompilationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearEndBalanceSheetCompilationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
