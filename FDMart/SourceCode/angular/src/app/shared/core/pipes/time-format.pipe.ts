import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'TimeFormatPipe',
})
export class TimeFormatPipe implements PipeTransform {
    
    getDateFormatString(){
        return 'HH:mm';
    }

    momentToString(m : moment.Moment){
        return moment(m).format(this.getDateFormatString());
    }

    transform(value: moment.Moment) {
        if (!value) {
            return '';
        }
        return this.momentToString(value);
    }
}