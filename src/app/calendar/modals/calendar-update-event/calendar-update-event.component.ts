import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { isWeekend, getDate, getMonth, parse, toDate, getYear } from 'date-fns';
import { DateTransformService } from 'src/app/services/date-transform.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendar-update-event',
  templateUrl: './calendar-update-event.component.html',
  styleUrls: ['./calendar-update-event.component.scss']
})
export class CalendarUpdateEventComponent implements OnInit {

  constructor(private dateTranformService: DateTransformService) { }

  @Input() calendarItemInfo;
  @Output() closeModal = new EventEmitter();
  @Output() addCalendarEvent = new EventEmitter();
  @Output() deleteCalendarEvent = new EventEmitter();
  public form: FormGroup;
  public position;
  public eventAddDate;

  public addEvent() {
    if (!this.calendarItemInfo.calendarItem.event) {
      this.form.value.date = parse(this.form.value.date, 'dd.MM.yyyy', new Date());
    }
    this.addCalendarEvent.emit(this.form.value);
  }

  public isweekend() {
    return isWeekend(this.calendarItemInfo.calendarItem.date);
  }

  private formCreate() {
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      event: new FormControl('', Validators.required),
      persons: new FormControl('', Validators.required),
      description: new FormControl(),
    });
  }

  private patchForm(flag) {
    if (flag) {
      this.form.patchValue({
        date: this.calendarItemInfo.calendarItem.date,
        event: this.calendarItemInfo.calendarItem.event,
        persons: this.calendarItemInfo.calendarItem.persons,
        description: this.calendarItemInfo.calendarItem.description,
      });
    } else {
      const format = toDate(this.calendarItemInfo.calendarItem.date);
      const formatDate = `${getDate(format)}.${getMonth(format) + 1}.${getYear(format)}`;
      this.form.patchValue({
        date: formatDate
      });
    }
  }

  ngOnInit() {
    this.formCreate();
    this.patchForm(this.calendarItemInfo.calendarItem.event);

    this.eventAddDate = getDate(this.calendarItemInfo.calendarItem.date) + ' ' +
    this.dateTranformService.monthFromNumberFull(getMonth(this.calendarItemInfo.calendarItem.date));

    this.position = {
      left: `
        ${this.calendarItemInfo.left +
        this.calendarItemInfo.width +
        (this.isweekend() ? -470 : 0)}px
      `,
      top: `${this.calendarItemInfo.top - 100}px`
    };
  }

}
