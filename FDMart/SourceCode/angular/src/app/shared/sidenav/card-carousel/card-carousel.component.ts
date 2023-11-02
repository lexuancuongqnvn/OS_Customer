import { Component, Input, OnInit } from '@angular/core';
import { SYS_List_App_ENTITY, SYS_Menu } from '../../service-proxies/api-shared';


declare var CreateNewCardCarousel
@Component({
  selector: 'card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.css']
})

export class CardCarouselComponent implements OnInit {

  constructor() { 
    this.className = 'card-'+((new Date().getTime())*Math.random()).toString().replace('.','-')
  }
  @Input() DataMenus:SYS_Menu[] = [];
  className:string =   ''
  ngOnInit(): void {
    CreateNewCardCarousel(this.className)
  }

}
