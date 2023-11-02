import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S31MListComponent } from './s31-m-list.component';

describe('S31MListComponent', () => {
  let component: S31MListComponent;
  let fixture: ComponentFixture<S31MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S31MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S31MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
