import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I42MComponent } from './i42-m.component';

describe('I42MComponent', () => {
  let component: I42MComponent;
  let fixture: ComponentFixture<I42MComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I42MComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I42MComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
