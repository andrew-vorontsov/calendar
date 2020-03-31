import { Injectable } from '@angular/core';
import { CalendarItem } from '../interfaces/calendar-item.interface';
import { getDay, addDays, startOfMonth, getMonth, getYear, getDate } from 'date-fns';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarApiService {

  public calendarState$: Subject<CalendarItem[]> = new Subject<CalendarItem[]>();
  public currentMonth$: Subject<string> = new Subject<string>();
  public currentYear$: Subject<number> = new Subject<number>();

  private calendarState: CalendarItem[] = [];
  private eventState: CalendarItem[] = [
    {
      date: 1585665669911,
      event: 'second',
      persons: ['Oleg']
    },
    {
      date: 1585462434991,
      event: 'hello',
      persons: ['Oleg']
    }
  ];

  private setMonthOfState(): void {
    const monthNumber = getMonth(this.calendarState[20].date);
    let month: string;
    switch (monthNumber) {
      case 0:
        month = 'Январь';
        break;
      case 1:
        month = 'Февраль';
        break;
      case 2:
        month = 'Март';
        break;
      case 3:
        month = 'Апрель';
        break;
      case 4:
        month = 'Май';
        break;
      case 5:
        month = 'Июнь';
        break;
      case 6:
        month = 'Июль';
        break;
      case 7:
        month = 'Август';
        break;
      case 8:
        month = 'Сентябрь';
        break;
      case 9:
        month = 'Октябрь';
        break;
      case 10:
        month = 'Ноябрь';
        break;
      case 11:
        month = 'Декабрь';
        break;
    }
    this.currentMonth$.next(month);
  }

  private setYearOfState(): void {
    this.currentYear$.next(getYear(this.calendarState[20].date));
  }

  private mergeStates(calendarState: CalendarItem[], eventState: CalendarItem[]) {
    for (let i = 0; i < calendarState.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < eventState.length; j++) {
        if (
          getDate(calendarState[i].date) === getDate(eventState[j].date) &&
          getMonth(calendarState[i].date) === getMonth(eventState[j].date)) {
            calendarState[i] = eventState[j];
        }
      }
    }
  }

  public updateCalendarState(date): void {
    this.calendarState = [];
    const startOfMonthDate = startOfMonth(date);
    let startOfMonthDay = getDay(startOfMonthDate);
    if (startOfMonthDay === 0) {
      startOfMonthDay = 7;
    }

    for (let i = 1; i < startOfMonthDay; i++) {
      this.calendarState.push({date: +addDays(startOfMonthDate, i - startOfMonthDay), event: '', persons: []});
    }

    for (let i = 0; this.calendarState.length < 42; i++) {
      this.calendarState.push({date: +addDays(startOfMonthDate, i), event: '', persons: []});
    }

    this.mergeStates(this.calendarState, this.eventState);
    this.setYearOfState();
    this.setMonthOfState();
    this.calendarState$.next(this.calendarState);
  }

  constructor() { }
}
