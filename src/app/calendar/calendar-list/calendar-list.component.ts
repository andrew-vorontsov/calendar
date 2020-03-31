import { Component, OnInit } from '@angular/core';
import { CalendarApiService } from 'src/app/services/calendar-api.service';
import { CalendarItem } from 'src/app/interfaces/calendar-item.interface';
import { addMonths } from 'date-fns';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {
  constructor(private calendarApi: CalendarApiService) { }

  public calendarItems: CalendarItem[];
  public currentMonth: string;
  public currentYear: number;

  switchMonth(num) {
    this.calendarApi.updateCalendarState(addMonths(this.calendarItems[20].date, num));
  }

  switchCurrentDate() {
    this.calendarApi.updateCalendarState(new Date());
  }

  ngOnInit() {
    this.calendarApi.currentMonth$.subscribe(val => this.currentMonth = val);
    this.calendarApi.currentYear$.subscribe(val => this.currentYear = val);
    this.calendarApi.calendarState$.subscribe(val => this.calendarItems = val);
    this.calendarApi.updateCalendarState(new Date());
  }

}
