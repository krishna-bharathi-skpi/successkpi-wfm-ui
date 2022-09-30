import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
    name: "dateConvert"
})
export class DatePipe implements PipeTransform {
    transform(timestamp?: number): any {

        return moment(new Date(timestamp)).format('MM/DD/YYYY h:mm A')


    }
}