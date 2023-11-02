import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAddEditComponent } from './input-filter.component';

describe('InputAddEditComponent', () => {
  let component: InputAddEditComponent;
  let fixture: ComponentFixture<InputAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputAddEditComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
