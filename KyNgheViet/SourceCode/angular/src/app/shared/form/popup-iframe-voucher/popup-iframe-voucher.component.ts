import { Component, Injector, Input, OnInit } from '@angular/core';
import { LayoutComponentBase } from '../../layout/layoutBase';

@Component({
  selector: 'popup-iframe-voucher',
  templateUrl: './popup-iframe-voucher.component.html',
  styleUrls: ['./popup-iframe-voucher.component.css']
})
export class PopupIframeVoucherComponent implements OnInit{

  @Input() rowSelected: any = ''
  @Input() code: any = ''
  ngOnInit(): void {
  }

}
