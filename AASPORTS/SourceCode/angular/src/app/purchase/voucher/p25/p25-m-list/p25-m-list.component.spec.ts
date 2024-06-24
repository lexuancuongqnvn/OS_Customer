import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P25MListComponent } from './p25-m-list.component';

describe('P25MListComponent', () => {
  let component: P25MListComponent;
  let fixture: ComponentFixture<P25MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P25MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P25MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
