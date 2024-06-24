import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P35MEditComponent } from './p35-m-edit.component';

describe('P35MEditComponent', () => {
  let component: P35MEditComponent;
  let fixture: ComponentFixture<P35MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P35MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P35MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
