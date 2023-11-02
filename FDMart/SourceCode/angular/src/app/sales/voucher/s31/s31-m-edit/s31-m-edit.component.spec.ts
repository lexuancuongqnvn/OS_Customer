import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S31MEditComponent } from './s31-m-edit.component';

describe('S31MEditComponent', () => {
  let component: S31MEditComponent;
  let fixture: ComponentFixture<S31MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S31MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S31MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
