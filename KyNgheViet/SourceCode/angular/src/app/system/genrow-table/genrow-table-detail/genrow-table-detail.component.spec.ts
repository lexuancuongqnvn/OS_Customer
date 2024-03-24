import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrowTableDetailComponent } from './genrow-table-detail.component';

describe('GenrowTableDetailComponent', () => {
  let component: GenrowTableDetailComponent;
  let fixture: ComponentFixture<GenrowTableDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenrowTableDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenrowTableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
