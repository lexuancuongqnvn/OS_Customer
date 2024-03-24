import { AfterContentChecked, Component, Injector, OnInit } from '@angular/core';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { BreadCrumbItemCustom, LayoutComponentBase } from '../layoutBase';

@Component({
  selector: 'layout-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})

export class BreadcrumbComponent extends LayoutComponentBase implements OnInit {
  public items: BreadCrumbItemCustom[] = [...this.defaultItems];
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }



  public onItemClick(item: BreadCrumbItemCustom): void {
    const index = this.items.findIndex(e => e.text === item.text);
    this.items = this.items.slice(0, index + 1);
  }

  public refreshBreadCrumb(): void {
    console.log(this.defaultItems)
    this.items = [...this.defaultItems];
  }
}
