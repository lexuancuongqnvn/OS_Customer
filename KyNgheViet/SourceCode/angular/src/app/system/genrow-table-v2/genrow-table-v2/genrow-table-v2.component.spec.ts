import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrowTableV2Component } from './genrow-table-v2.component';

describe('GenrowTableV2Component', () => {
  let component: GenrowTableV2Component;
  let fixture: ComponentFixture<GenrowTableV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenrowTableV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenrowTableV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
