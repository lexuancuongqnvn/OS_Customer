import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I45MListComponent } from './i45-m-list.component';

describe('I45MListComponent', () => {
  let component: I45MListComponent;
  let fixture: ComponentFixture<I45MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I45MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I45MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
