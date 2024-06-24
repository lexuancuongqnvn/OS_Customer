import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I44MListComponent } from './i44-m-list.component';

describe('I44MListComponent', () => {
  let component: I44MListComponent;
  let fixture: ComponentFixture<I44MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I44MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I44MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
