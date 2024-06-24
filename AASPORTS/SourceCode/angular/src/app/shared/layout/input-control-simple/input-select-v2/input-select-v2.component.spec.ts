import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectComponentV2 } from './input-select-v2.component';

describe('InputSelectComponentV2', () => {
  let component: InputSelectComponentV2;
  let fixture: ComponentFixture<InputSelectComponentV2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSelectComponentV2 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSelectComponentV2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
