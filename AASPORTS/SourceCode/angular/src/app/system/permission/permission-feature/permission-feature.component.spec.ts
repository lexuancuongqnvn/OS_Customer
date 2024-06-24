import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionFeatureComponent } from './permission-feature.component';

describe('PermissionFeatureComponent', () => {
  let component: PermissionFeatureComponent;
  let fixture: ComponentFixture<PermissionFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
