import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chart-pie-with-small-values-grouped',
  templateUrl: './pie-with-small-values-grouped.component.html',
  styleUrls: ['./pie-with-small-values-grouped.component.css']
})
export class PieWithSmallValuesGroupedComponent implements OnInit {

  internetLanguages: LanguageData[] = [{
    language: 'English',
    percent: 55.5,
  }, {
    language: 'Chinese',
    percent: 2.8,
  }, {
    language: 'Spanish',
    percent: 4.6,
  }, {
    language: 'Japanese',
    percent: 5.0,
  }, {
    language: 'Portuguese',
    percent: 2.5,
  }, {
    language: 'German',
    percent: 5.8,
  }, {
    language: 'French',
    percent: 4.0,
  }, {
    language: 'Russian',
    percent: 5.9,
  }, {
    language: 'Italian',
    percent: 1.9,
  }, {
    language: 'Polish',
    percent: 1.7,
  }, {
    language: 'Turkish',
    percent: 1.5,
  }, {
    language: 'Dutch',
    percent: 1.3,
  }, {
    language: 'Persian',
    percent: 0.9,
  }, {
    language: 'Arabic',
    percent: 0.8,
  }, {
    language: 'Korean',
    percent: 0.7,
  }, {
    language: 'Czech',
    percent: 0.7,
  }, {
    language: 'Swedish',
    percent: 0.5,
  }, {
    language: 'Vietnamese',
    percent: 0.4,
  }, {
    language: 'Indonesian',
    percent: 0.4,
  }, {
    language: 'Greek',
    percent: 0.4,
  }, {
    language: 'Romanian',
    percent: 0.4,
  }, {
    language: 'Hungarian',
    percent: 0.3,
  }, {
    language: 'Danish',
    percent: 0.3,
  }, {
    language: 'Thai',
    percent: 0.3,
  }, {
    language: 'Finnish',
    percent: 0.2,
  }, {
    language: 'Slovak',
    percent: 0.2,
  }, {
    language: 'Bulgarian',
    percent: 0.2,
  }, {
    language: 'Norwegian',
    percent: 0.2,
  }, {
    language: 'Hebrew',
    percent: 0.1,
  }, {
    language: 'Lithuanian',
    percent: 0.1,
  }, {
    language: 'Croatian',
    percent: 0.1,
  }, {
    language: 'Ukrainian',
    percent: 0.1,
  }, {
    language: 'Norwegian Bokmål',
    percent: 0.1,
  }, {
    language: 'Serbian',
    percent: 0.1,
  }, {
    language: 'Catalan',
    percent: 0.1,
  }, {
    language: 'Slovenian',
    percent: 0.1,
  }, {
    language: 'Latvian',
    percent: 0.1,
  }, {
    language: 'Estonian',
    percent: 0.1,
  }];

  constructor() {
   
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  customizeLabel(point) {
    return `${point.argumentText}: ${point.valueText}%`;
  }

}

export class LanguageData {
  language: string;

  percent: number;
}