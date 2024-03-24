import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chart-standard-bar',
  templateUrl: './standard-bar.component.html',
  styleUrls: ['./standard-bar.component.css']
})
export class StandardBarComponent implements OnInit {

  dataSource: Data[] = [{
    day: 'Monday',
    oranges: 3,
  }, {
    day: 'Tuesday',
    oranges: 2,
  }, {
    day: 'Wednesday',
    oranges: 3,
  }, {
    day: 'Thursday',
    oranges: 4,
  }, {
    day: 'Friday',
    oranges: 6,
  }, {
    day: 'Saturday',
    oranges: 11,
  }, {
    day: 'Sunday',
    oranges: 4,
  }];
  constructor() { }

  ngOnInit(): void {
  }

}
export class Data {
  day: string;

  oranges: number;
}