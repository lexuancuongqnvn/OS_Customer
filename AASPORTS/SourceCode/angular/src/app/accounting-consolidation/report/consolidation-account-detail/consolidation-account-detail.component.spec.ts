import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidationAccountDetailComponent } from './consolidation-account-detail.component';

describe('ConsolidationAccountDetailComponent', () => {
  let component: ConsolidationAccountDetailComponent;
  let fixture: ComponentFixture<ConsolidationAccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidationAccountDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidationAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
