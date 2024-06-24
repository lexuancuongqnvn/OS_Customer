import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcctionComponent } from './acction.component';

describe('AcctionComponent', () => {
  let component: AcctionComponent;
  let fixture: ComponentFixture<AcctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
