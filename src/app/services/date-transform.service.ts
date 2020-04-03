import { Injectable } from '@angular/core';
import { getMonth, getDate } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateTransformService {

  constructor() { }

  private monthArray = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'мюля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  private monthArrayEnds = [
    'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
  ];

  monthFromNumber(monthNumber) {
    return this.monthArrayEnds[monthNumber];
  }

  monthFromNumberFull(monthNumber) {
    return this.monthArray[monthNumber];
  }

  monthFromString(month: string) {
    return this.monthArray.findIndex(item => month.includes(item));
  }

  dateFromSearch(searchValue: string) {
    if (!searchValue) { return null; }
    const searchArr = searchValue.match(/\S+/g);
    if (searchArr.length < 2) { return null; }
    return `${searchArr[0]} ${searchArr[1]}`;
  }

  dateFromEvent(date: number) {
    return `${getDate(date)} ${this.monthFromNumberFull(getMonth(date))}`;
  }
}
