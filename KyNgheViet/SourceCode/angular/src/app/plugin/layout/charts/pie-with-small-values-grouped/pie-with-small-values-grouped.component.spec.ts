import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieWithSmallValuesGroupedComponent } from './pie-with-small-values-grouped.component';

describe('PieWithSmallValuesGroupedComponent', () => {
  let component: PieWithSmallValuesGroupedComponent;
  let fixture: ComponentFixture<PieWithSmallValuesGroupedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieWithSmallValuesGroupedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieWithSmallValuesGroupedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
