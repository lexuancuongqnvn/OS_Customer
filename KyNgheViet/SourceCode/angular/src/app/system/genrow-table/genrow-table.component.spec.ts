import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrowTableComponent } from './genrow-table.component';

describe('GenrowTableComponent', () => {
  let component: GenrowTableComponent;
  let fixture: ComponentFixture<GenrowTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenrowTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenrowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
