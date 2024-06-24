import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P21MEditComponent } from './p21-m-edit.component';

describe('P21MEditComponent', () => {
  let component: P21MEditComponent;
  let fixture: ComponentFixture<P21MEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P21MEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P21MEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
