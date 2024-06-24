import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectComponentIMG } from './input-select-img.component';

describe('InputSelectComponentIMG', () => {
  let component: InputSelectComponentIMG;
  let fixture: ComponentFixture<InputSelectComponentIMG>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSelectComponentIMG ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSelectComponentIMG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
