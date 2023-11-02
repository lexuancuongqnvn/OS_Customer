import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P26MListComponent } from './p26-m-list.component';

describe('P26MListComponent', () => {
  let component: P26MListComponent;
  let fixture: ComponentFixture<P26MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P26MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P26MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
