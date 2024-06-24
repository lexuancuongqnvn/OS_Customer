import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidationByAAccountComponent } from './consolidation-by-a-account.component';

describe('ConsolidationByAAccountComponent', () => {
  let component: ConsolidationByAAccountComponent;
  let fixture: ComponentFixture<ConsolidationByAAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidationByAAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidationByAAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
