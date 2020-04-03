import { Injectable } from '@angular/core';
import { CalendarItem } from '../interfaces/calendar-item.interface';
import { getDay, addDays, startOfMonth, getMonth, getYear, getDate, getTime, isSameDay } from 'date-fns';
import { Subject, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DateTransformService } from './date-transform.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarApiService {

  private calendarState: CalendarItem[] = [];
  private eventState: CalendarItem[] = [
    {
      date: 1585891352111,
      event: 'Первый день',
      persons: 'Андрей Воронцов',
      description: 'Тестовое описание',
    },
    {
      date: 1585721954000,
      event: 'Второй день',
      persons: 'Оля день',
      description: '',
    },
    {
      date: 1585421954000,
      event: 'Третий день',
      persons: 'март день',
      description: '',
    }
  ];

  private calendarState$: Subject<CalendarItem[]> = new Subject<CalendarItem[]>();
  private searchState$: Subject<CalendarItem[]> = new Subject<CalendarItem[]>();
  private currentMonth$: Subject<string> = new Subject<string>();
  private currentYear$: Subject<number> = new Subject<number>();

  public getCurrentMonth() {
    return this.currentMonth$.asObservable();
  }
  public getCurrentYear() {
    return this.currentYear$.asObservable();
  }
  public getCurrentCalendar() {
    return this.calendarState$.asObservable();
  }
  public getSearchEvents() {
    return this.searchState$.asObservable();
  }

  public searchEvents(searchValue: string) {
    searchValue = searchValue.toLowerCase();
    const searchEvent = this.eventState.filter(item => item.event.toLowerCase().includes(searchValue));
    const date = this.dateTransform.dateFromSearch(searchValue);
    const searchDate = this.eventState.filter(item => this.dateTransform.dateFromEvent(item.date) === date);
    const searchPersons = this.eventState.filter(item => item.persons.toLowerCase().includes(searchValue));
    const set = new Set([...searchEvent, ...searchDate, ...searchPersons]);
    this.searchState$.next([...set]);
  }

  private setMonthOfState(): void {
    const monthNumber = getMonth(this.calendarState[20].date);
    this.currentMonth$.next(this.dateTransform.monthFromNumber(monthNumber));
  }
  private setYearOfState(): void {
    this.currentYear$.next(getYear(this.calendarState[20].date));
  }

  private mergeStates(calendarState: CalendarItem[], eventState: CalendarItem[]) {
    for (let i = 0; i < calendarState.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < eventState.length; j++) {
        if (isSameDay(calendarState[i].date, eventState[j].date)) {
          calendarState[i] = eventState[j];
        }
      }
    }
  }

  public addEventToState(eventObject: string): void {
      const eventArray = eventObject.match(/\S+/g);
      let eventMonth = this.dateTransform.monthFromString(eventArray[1]);
      if (eventMonth === -1) { eventMonth = getMonth(new Date()); }
      const eventDate = new Date(getYear(new Date()), eventMonth, +eventArray[0]);
      const eventMessage = eventArray.slice(2).join(' ');
      const repeatEvent = this.eventState.find(item => isSameDay(item.date, eventDate));
      if (repeatEvent) {
        alert('На эту дату уже есть событие');
        return null;
      } else if (!eventMessage) {
        alert('Укажите событие');
        return null;
      } else {
        this.eventState.push({date: getTime(eventDate), event: eventMessage, persons: 'Я', description: ''});
        this.updateCalendarState(getTime(eventDate));
      }
  }

  public updateEventState(eventObject: CalendarItem): void {
    eventObject.date = getTime(eventObject.date);
    const repeatEvent = this.eventState.findIndex(item => isSameDay(item.date, eventObject.date));
    if (repeatEvent === -1) {
      this.eventState.push(eventObject);
      this.updateCalendarState(getTime(eventObject.date));
    } else {
      this.eventState[repeatEvent] = eventObject;
      this.updateCalendarState(getTime(eventObject.date));
    }
}

  public updateCalendarState(date): void {
    this.calendarState = [];
    const startOfMonthDate = startOfMonth(date);
    let startOfMonthDay = getDay(startOfMonthDate);
    // Воскресенье -> Понедельник
    if (startOfMonthDay === 0) {
      startOfMonthDay = 7;
    }

    for (let i = 1; i < startOfMonthDay; i++) {
      this.calendarState.push({date: +addDays(startOfMonthDate, i - startOfMonthDay), event: '', persons: '', description: ''});
    }

    for (let i = 0; this.calendarState.length < 42; i++) {
      this.calendarState.push({date: +addDays(startOfMonthDate, i), event: '', persons: '', description: ''});
    }

    this.mergeStates(this.calendarState, this.eventState);
    this.setYearOfState();
    this.setMonthOfState();
    this.calendarState$.next(this.calendarState);
  }

  public deleteFromEventState(date) {
    const deleteEventIndex = this.eventState.findIndex(item => isSameDay(item.date, date));
    this.eventState.splice(deleteEventIndex, 1);
    this.updateCalendarState(date);
  }

  public focusOnEvent(item: CalendarItem) {
    this.updateCalendarState(item.date);
  }

  constructor(private dateTransform: DateTransformService) { }
}
