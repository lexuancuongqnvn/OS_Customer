import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P23MEditComponent } from './p23-m-edit.component';

describe('P23MEditComponent', () => {
  let component: P23MEditComponent;
  let fixture: ComponentFixture<P23MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P23MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P23MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
