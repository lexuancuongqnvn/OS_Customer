import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopAppComponent } from './stop-app.component';

describe('StopAppComponent', () => {
  let component: StopAppComponent;
  let fixture: ComponentFixture<StopAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StopAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
