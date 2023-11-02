import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { isString } from 'ngx-cookie';

@Pipe({
    name: 'DateFormatYearPipe',
})
export class DateFormatYearPipe implements PipeTransform {
    
    getDateFormatString(){
        return 'YYYY';
    }

    momentToString(m : moment.Moment){
        return moment(m).format(this.getDateFormatString());
    }

    transform(value: moment.Moment) {
        if( isString(value)){
            value =  moment(value)
        }
        try{
            if (value['_i']== "Invalid Date" || !value) {
                return '';
            }
        }catch{}
        return this.momentToString(value);
    }
}