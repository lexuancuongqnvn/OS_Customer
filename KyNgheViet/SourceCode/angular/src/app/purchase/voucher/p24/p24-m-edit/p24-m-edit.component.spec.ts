import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P24MEditComponent } from './p24-m-edit.component';

describe('P24MEditComponent', () => {
  let component: P24MEditComponent;
  let fixture: ComponentFixture<P24MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P24MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P24MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
