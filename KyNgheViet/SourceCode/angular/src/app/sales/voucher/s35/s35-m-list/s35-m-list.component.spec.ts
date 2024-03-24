import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S35MListComponent } from './s35-m-list.component';

describe('S35MListComponent', () => {
  let component: S35MListComponent;
  let fixture: ComponentFixture<S35MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S35MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S35MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
