import { Injector, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { CookieService, isString } from 'ngx-cookie';

@Pipe({
    name: 'DateFormatPipe',
})
export class DateFormatPipe implements PipeTransform {
    cookieService: CookieService;
    constructor(
        injector: Injector
    ) {
      this.cookieService = injector.get(CookieService);
    }
    getDateFormatString(){
        var user_login = this.cookieService.getObject('userlogin');
        return user_login['language_id'] == 1?'DD/MM/YYYY':'YYYY/MM/DD';
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