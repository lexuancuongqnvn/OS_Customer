import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyCertificateListComponent } from './warranty-certificate-list.component';

describe('WarrantyCertificateListComponent', () => {
  let component: WarrantyCertificateListComponent;
  let fixture: ComponentFixture<WarrantyCertificateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrantyCertificateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyCertificateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
