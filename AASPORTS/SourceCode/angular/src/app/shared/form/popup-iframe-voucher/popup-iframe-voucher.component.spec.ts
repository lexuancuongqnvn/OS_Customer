import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupIframeVoucherComponent } from './popup-iframe-voucher.component';

describe('PopupIframeVoucherComponent', () => {
  let component: PopupIframeVoucherComponent;
  let fixture: ComponentFixture<PopupIframeVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupIframeVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupIframeVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
