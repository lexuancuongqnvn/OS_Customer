import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C16MListComponent } from './c16-m-list.component';

describe('C16MListComponent', () => {
  let component: C16MListComponent;
  let fixture: ComponentFixture<C16MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ C16MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(C16MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
