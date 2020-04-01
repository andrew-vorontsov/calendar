import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar-add-event',
  templateUrl: './calendar-add-event.component.html',
  styleUrls: ['./calendar-add-event.component.scss']
})
export class CalendarAddEventComponent implements OnInit {

  constructor() { }

  public eventObject: string;
  @Output() closeModal = new EventEmitter();
  @Output() addCalendarEvent = new EventEmitter();

  public addEvent() {
    this.addCalendarEvent.emit(this.eventObject);
  }

  ngOnInit() {
  }

}
