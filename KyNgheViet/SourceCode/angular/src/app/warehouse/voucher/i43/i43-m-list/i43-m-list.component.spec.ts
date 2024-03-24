import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I43MListComponent } from './i43-m-list.component';

describe('I43MListComponent', () => {
  let component: I43MListComponent;
  let fixture: ComponentFixture<I43MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ I43MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(I43MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
