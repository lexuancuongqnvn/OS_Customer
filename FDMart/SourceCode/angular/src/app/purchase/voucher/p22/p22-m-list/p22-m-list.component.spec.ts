import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P22MListComponent } from './p22-m-list.component';

describe('P22MListComponent', () => {
  let component: P22MListComponent;
  let fixture: ComponentFixture<P22MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P22MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P22MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
