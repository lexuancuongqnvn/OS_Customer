import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptDecryptStringComponent } from './encrypt-decrypt-string.component';

describe('EncryptDecryptStringComponent', () => {
  let component: EncryptDecryptStringComponent;
  let fixture: ComponentFixture<EncryptDecryptStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncryptDecryptStringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptDecryptStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
