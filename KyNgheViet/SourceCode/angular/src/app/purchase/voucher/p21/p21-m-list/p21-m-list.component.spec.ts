import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P21MListComponent } from './p21-m-list.component';

describe('P21MListComponent', () => {
  let component: P21MListComponent;
  let fixture: ComponentFixture<P21MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P21MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P21MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
