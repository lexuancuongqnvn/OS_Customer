import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C12MListComponent } from './c12-m-list.component';

describe('C12MListComponent', () => {
  let component: C12MListComponent;
  let fixture: ComponentFixture<C12MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C12MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C12MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
