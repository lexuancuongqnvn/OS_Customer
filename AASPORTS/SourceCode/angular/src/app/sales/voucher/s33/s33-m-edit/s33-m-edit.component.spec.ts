import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S33MEditComponent } from './s33-m-edit.component';

describe('S33MEditComponent', () => {
  let component: S33MEditComponent;
  let fixture: ComponentFixture<S33MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S33MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S33MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
