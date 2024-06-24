import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let component: AppDrawerComponent;
  let fixture: ComponentFixture<AppDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppDrawerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
