import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S34MListComponent } from './s34-m-list.component';

describe('S34MListComponent', () => {
  let component: S34MListComponent;
  let fixture: ComponentFixture<S34MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S34MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S34MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
