import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar-update-event',
  templateUrl: './calendar-update-event.component.html',
  styleUrls: ['./calendar-update-event.component.scss']
})
export class CalendarUpdateEventComponent implements OnInit {

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
