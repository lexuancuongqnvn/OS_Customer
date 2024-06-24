import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObAccountEditComponent } from './ob-account-edit.component';

describe('ObAccountEditComponent', () => {
  let component: ObAccountEditComponent;
  let fixture: ComponentFixture<ObAccountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObAccountEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
