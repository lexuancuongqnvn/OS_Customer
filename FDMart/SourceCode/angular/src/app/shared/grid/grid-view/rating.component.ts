import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-kendo-rating',
    template: ` <span *ngFor="let item of stars" [ngClass]="ratingIcon(item)"></span> `,
    styles: [
        `
            .yellow {
                color: #ffa600;
            }
        `
    ]
})
export class RatingComponent implements OnInit {
    @Input() value: number;
    @Input() max: number;

    stars: number[];

    ngOnInit(): void {
        this.stars = new Array(this.max).fill(1).map((item, index) => item + index);
    }

    ratingIcon(item: number): string {
        return item <= this.value ? 'k-icon k-i-star yellow' : 'k-icon k-i-star-outline';
    }
}
