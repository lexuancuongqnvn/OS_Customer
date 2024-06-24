import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P35MListComponent } from './p35-m-list.component';

describe('P35MListComponent', () => {
  let component: P35MListComponent;
  let fixture: ComponentFixture<P35MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P35MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P35MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
