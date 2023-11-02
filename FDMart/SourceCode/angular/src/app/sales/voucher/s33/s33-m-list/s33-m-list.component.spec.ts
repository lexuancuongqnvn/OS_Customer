import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S33MListComponent } from './s33-m-list.component';

describe('S33MListComponent', () => {
  let component: S33MListComponent;
  let fixture: ComponentFixture<S33MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S33MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S33MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
