import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysListAppComponent } from './sys-list-app.component';

describe('SysListAppComponent', () => {
  let component: SysListAppComponent;
  let fixture: ComponentFixture<SysListAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysListAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysListAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
