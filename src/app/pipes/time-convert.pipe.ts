import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConvert'
})
export class TimeConvertPipe implements PipeTransform {

  transform(totalSeconds?: any): any {
    // console.log('totalSeconds', totalSeconds)
    if (typeof (totalSeconds) == 'string') {
        totalSeconds = parseInt(totalSeconds.replace('s', ''))
    }
    if (!totalSeconds) return totalSeconds;
    //  alert();

    let hours: any = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes: any = Math.floor(totalSeconds / 60);
    let seconds: any = Math.round(totalSeconds % 60)
    // If you want strings with leading zeroes:
    minutes = String(minutes).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    if (hours != '00') {
        return hours + ":" + minutes + ":" + seconds
    }
    else {
        return minutes + ":" + seconds
    }

}

}
