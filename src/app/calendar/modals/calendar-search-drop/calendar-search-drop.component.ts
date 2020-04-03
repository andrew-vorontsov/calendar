import { Component, OnInit, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CalendarItem } from 'src/app/interfaces/calendar-item.interface';
import { DateTransformService } from 'src/app/services/date-transform.service';

@Component({
  selector: 'app-calendar-search-drop',
  templateUrl: './calendar-search-drop.component.html',
  styleUrls: ['./calendar-search-drop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarSearchDropComponent implements OnInit {

  constructor(private dateTransform: DateTransformService) { }

  @Input() public eventList: CalendarItem[] = [];
  @Output() public getEventListItem = new EventEmitter();

  public dateFormat(date) {
    return this.dateTransform.dateFromEvent(date);
  }

  public getListItem(item) {
    this.getEventListItem.emit(item);
  }

  ngOnInit() {
  }

}
