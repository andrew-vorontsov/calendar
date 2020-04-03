import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ModalRefDirective } from 'src/app/calendar/modals/modal-ref.directive';
import { CalendarAddEventComponent } from 'src/app/calendar/modals/calendar-add-event/calendar-add-event.component';
import { CalendarApiService } from 'src/app/services/calendar-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private resolver: ComponentFactoryResolver, private calendarApi: CalendarApiService) { }

  @ViewChild(ModalRefDirective, {static: false}) refDir: ModalRefDirective;

  public showModal() {
    const modalFactory = this.resolver.resolveComponentFactory(CalendarAddEventComponent);
    this.refDir.containerRef.clear();

    const component = this.refDir.containerRef.createComponent(modalFactory);
    component.instance.addCalendarEvent.subscribe(val => {
      this.calendarApi.addEventToState(val);
      this.refDir.containerRef.clear();
    });
    component.instance.closeModal.subscribe(() => {
      this.refDir.containerRef.clear();
    });
  }

  ngOnInit() {
  }

}
