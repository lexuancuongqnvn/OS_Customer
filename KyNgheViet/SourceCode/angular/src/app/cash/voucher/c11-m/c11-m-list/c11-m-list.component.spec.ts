import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C11MListComponent } from './c11-m-list.component';

describe('C11MListComponent', () => {
  let component: C11MListComponent;
  let fixture: ComponentFixture<C11MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C11MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C11MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
