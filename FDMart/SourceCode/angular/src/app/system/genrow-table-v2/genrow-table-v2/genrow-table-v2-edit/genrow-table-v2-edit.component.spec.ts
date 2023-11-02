import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrowTableV2EditComponent } from './genrow-table-v2-edit.component';

describe('GenrowTableV2EditComponent', () => {
  let component: GenrowTableV2EditComponent;
  let fixture: ComponentFixture<GenrowTableV2EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenrowTableV2EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenrowTableV2EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
