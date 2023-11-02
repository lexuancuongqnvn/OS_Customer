import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyCertificateEditComponent } from './warranty-certificate-edit.component';

describe('WarrantyCertificateEditComponent', () => {
  let component: WarrantyCertificateEditComponent;
  let fixture: ComponentFixture<WarrantyCertificateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrantyCertificateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyCertificateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
