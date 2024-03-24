import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I41MListComponent } from './i41-m-list.component';

describe('I41MListComponent', () => {
  let component: I41MListComponent;
  let fixture: ComponentFixture<I41MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I41MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I41MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
