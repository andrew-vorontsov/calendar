import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CalendarItem } from 'src/app/interfaces/calendar-item.interface';

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

  public isEvent() {
    return Boolean(this.calendarItem.event.length);
  }

  constructor() { }

  ngOnInit() {
  }

}
