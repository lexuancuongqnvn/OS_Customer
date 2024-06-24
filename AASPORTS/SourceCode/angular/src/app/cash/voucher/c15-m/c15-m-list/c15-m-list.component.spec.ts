import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C15MListComponent } from './c15-m-list.component';

describe('C15MListComponent', () => {
  let component: C15MListComponent;
  let fixture: ComponentFixture<C15MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C15MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C15MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
