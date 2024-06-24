import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutContentOnlyComponent } from './layout-content-only.component';

describe('LayoutContentOnlyComponent', () => {
  let component: LayoutContentOnlyComponent;
  let fixture: ComponentFixture<LayoutContentOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutContentOnlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutContentOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
