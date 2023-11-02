import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P23MListComponent } from './p23-m-list.component';

describe('P23MListComponent', () => {
  let component: P23MListComponent;
  let fixture: ComponentFixture<P23MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P23MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P23MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
