import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInventoryRealtimeComponent } from './report-inventory-realtime.component';

describe('ReportInventoryRealtimeComponent', () => {
  let component: ReportInventoryRealtimeComponent;
  let fixture: ComponentFixture<ReportInventoryRealtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInventoryRealtimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInventoryRealtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
