import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chart-spline-area',
  templateUrl: './spline-area.component.html',
  styleUrls: ['./spline-area.component.css']
})
export class SplineAreaComponent implements OnInit {

  constructor() { }
  corporationsInfo: СorporationInfo[] = [{
    company: 'ExxonMobil',
    y2005: 377.28,
    y2004: 270.25,
  }, {
    company: 'GeneralElectric',
    y2005: 353.49,
    y2004: 311.43,
  }, {
    company: 'Microsoft',
    y2005: 269.86,
    y2004: 273.32,
  }, {
    company: 'Citigroup',
    y2005: 252.95,
    y2004: 280.50,
  }, {
    company: 'Royal Dutch Shell plc',
    y2005: 197.67,
    y2004: 165.89,
  }, {
    company: 'Procted & Gamble',
    y2005: 184.72,
    y2004: 130.52,
  }];

  types: string[] = ['splinearea', 'stackedsplinearea', 'fullstackedsplinearea'];

  ngOnInit(): void {
  }

}
export class СorporationInfo {
  company: string;

  y2005: number;

  y2004: number;
}
