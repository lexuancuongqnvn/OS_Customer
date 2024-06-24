import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavAddEditComponent } from './sidenav-add-edit.component';

describe('SidenavAddEditComponent', () => {
  let component: SidenavAddEditComponent;
  let fixture: ComponentFixture<SidenavAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
