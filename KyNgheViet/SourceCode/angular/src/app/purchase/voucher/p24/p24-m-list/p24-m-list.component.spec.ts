import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P24MListComponent } from './p24-m-list.component';

describe('P24MListComponent', () => {
  let component: P24MListComponent;
  let fixture: ComponentFixture<P24MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P24MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P24MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
