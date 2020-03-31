import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { CalendarItem } from 'src/app/interfaces/calendar-item.interface';

@Component({
  selector: 'app-calendar-list-item',
  templateUrl: './calendar-list-item.component.html',
  styleUrls: ['./calendar-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarListItemComponent implements OnInit {
  @Input() calendarItem: CalendarItem;

  constructor() { }

  ngOnInit() {
  }

}
