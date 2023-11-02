import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceidSettingComponent } from './faceid-setting.component';

describe('FaceidSettingComponent', () => {
  let component: FaceidSettingComponent;
  let fixture: ComponentFixture<FaceidSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceidSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceidSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
