import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObAccountListComponent } from './ob-account-list.component';

describe('ObAccountListComponent', () => {
  let component: ObAccountListComponent;
  let fixture: ComponentFixture<ObAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObAccountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
