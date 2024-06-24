import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P22MEditComponent } from './p22-m-edit.component';

describe('P22MEditComponent', () => {
  let component: P22MEditComponent;
  let fixture: ComponentFixture<P22MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P22MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P22MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
