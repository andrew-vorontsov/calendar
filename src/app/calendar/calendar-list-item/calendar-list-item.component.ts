import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CalendarItem } from 'src/app/interfaces/calendar-item.interface';
import { isSameDay } from 'date-fns';

@Component({
  selector: 'app-calendar-list-item',
  templateUrl: './calendar-list-item.component.html',
  styleUrls: ['./calendar-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarListItemComponent implements OnInit {
  @Input() calendarItem: CalendarItem;
  @Input() indexx: number;
  @Output() updateEvent = new EventEmitter();

  public daysOfWeek: string[] = ['Понедельник,', 'Вторник,', 'Среда,', 'Четверг,', 'Пятница,', 'Суббота,', 'Воскресенье,'];

  public currentDay() {
    return isSameDay(new Date(), this.calendarItem.date);
  }

  constructor() { }

  ngOnInit() {
  }

}
