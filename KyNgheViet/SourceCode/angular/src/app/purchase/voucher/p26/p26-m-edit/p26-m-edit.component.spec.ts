import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P26MEditComponent } from './p26-m-edit.component';

describe('P26MEditComponent', () => {
  let component: P26MEditComponent;
  let fixture: ComponentFixture<P26MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P26MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P26MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
