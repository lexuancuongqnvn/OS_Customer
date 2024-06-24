import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S32MListComponent } from './s32-m-list.component';

describe('S32MListComponent', () => {
  let component: S32MListComponent;
  let fixture: ComponentFixture<S32MListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S32MListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S32MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
