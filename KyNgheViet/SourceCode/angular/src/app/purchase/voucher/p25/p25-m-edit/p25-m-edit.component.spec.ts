import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P25MEditComponent } from './p25-m-edit.component';

describe('P25MEditComponent', () => {
  let component: P25MEditComponent;
  let fixture: ComponentFixture<P25MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P25MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P25MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
