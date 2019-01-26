import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
export class AppNgbDateStruct implements NgbDateStruct {
    /**
     * The year, for example 2016
     */
    year: number;
    /**
     * The month, for example 1=Jan ... 12=Dec
     */
    month: number;
    /**
     * The day of month, starting at 1
     */
    day: number;
    hours: number;
    minutes: number;
}