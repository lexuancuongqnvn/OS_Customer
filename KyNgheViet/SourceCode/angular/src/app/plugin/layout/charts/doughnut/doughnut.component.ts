import { PercentPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chart-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements OnInit {
  pipe: any = new PercentPipe('en-US');

  populationByRegions:LanguageData[] = [{
    language: 'English',
    percent: 55.5,
  }, {
    language: 'Chinese',
    percent: 4.0,
  }, {
    language: 'Spanish',
    percent: 4.3,
  }, {
    language: 'Japanese',
    percent: 4.9,
  }, {
    language: 'Portuguese',
    percent: 2.3,
  }, {
    language: 'German',
    percent: 5.6,
  }, {
    language: 'French',
    percent: 3.8,
  }, {
    language: 'Russian',
    percent: 6.3,
  }, {
    language: 'Italian',
    percent: 1.6,
  }, {
    language: 'Polish',
    percent: 1.8,
  }];

  constructor() { }

  customizeLabel(point) {
    return `${point.argumentText}: ${point.valueText}%`;
  }
  ngOnInit(): void {
  }

}


export class LanguageData {
  language: string;

  percent: number;
}