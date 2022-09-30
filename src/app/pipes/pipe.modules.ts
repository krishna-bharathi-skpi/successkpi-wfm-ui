import { NgModule } from '@angular/core';
import { SafePipe } from './safe.pipe'
import {TimeConvertPipe} from '../pipes/time-convert.pipe'

@NgModule({
    imports: [],
    declarations: [SafePipe,
                    TimeConvertPipe],
    exports: [SafePipe,TimeConvertPipe]
})
export class PipeModule { }