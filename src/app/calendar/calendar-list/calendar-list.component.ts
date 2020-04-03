import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { CalendarApiService } from 'src/app/services/calendar-api.service';
import { CalendarItem } from 'src/app/interfaces/calendar-item.interface';
import { addMonths } from 'date-fns';
import { ModalRefDirective } from '../modals/modal-ref.directive';
import { CalendarUpdateEventComponent } from '../modals/calendar-update-event/calendar-update-event.component';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {
  constructor(private calendarApi: CalendarApiService, private resolver: ComponentFactoryResolver) { }

  public calendarItems: CalendarItem[];
  public currentMonth: string;
  public currentYear: number;
  @ViewChild(ModalRefDirective, {static: false}) refDir: ModalRefDirective;

  public showModal($event, calendarItem) {
    const modalFactory = this.resolver.resolveComponentFactory(CalendarUpdateEventComponent);
    this.refDir.containerRef.clear();

    const component = this.refDir.containerRef.createComponent(modalFactory);
    component.instance.calendarItemInfo = {
      top: $event.target.offsetTop,
      left: $event.target.offsetLeft,
      width: $event.target.offsetWidth,
      calendarItem
    };
    component.instance.deleteCalendarEvent.subscribe(val => {
      this.calendarApi.deleteFromEventState(val);
      this.refDir.containerRef.clear();
    });
    component.instance.addCalendarEvent.subscribe(val => {
      this.calendarApi.updateEventState(val);
      this.refDir.containerRef.clear();
    });
    component.instance.closeModal.subscribe(() => {
      this.refDir.containerRef.clear();
    });
  }

  public switchMonth(num) {
    this.calendarApi.updateCalendarState(addMonths(this.calendarItems[20].date, num));
  }

  public switchCurrentDate() {
    this.calendarApi.updateCalendarState(new Date());
  }

  ngOnInit() {
    this.calendarApi.getCurrentMonth().subscribe(val => this.currentMonth = val);
    this.calendarApi.getCurrentYear().subscribe(val => this.currentYear = val);
    this.calendarApi.getCurrentCalendar().subscribe(val => this.calendarItems = val);
    this.calendarApi.updateCalendarState(new Date());
  }

}
