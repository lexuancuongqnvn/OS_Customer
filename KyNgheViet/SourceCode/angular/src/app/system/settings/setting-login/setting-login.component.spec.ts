import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingLoginComponent } from './setting-login.component';

describe('SettingLoginComponent', () => {
  let component: SettingLoginComponent;
  let fixture: ComponentFixture<SettingLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
