import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { CalendarApiService } from 'src/app/services/calendar-api.service';
import { ModalRefDirective } from 'src/app/calendar/modals/modal-ref.directive';
import { CalendarSearchDropComponent } from 'src/app/calendar/modals/calendar-search-drop/calendar-search-drop.component';
import { CalendarItem } from 'src/app/interfaces/calendar-item.interface';
import { Subject } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

  constructor(private resolver: ComponentFactoryResolver, private calendarApi: CalendarApiService) { }

  public searchValue = '';
  public eventList: CalendarItem[] = [];
  private stream$: Subject<string> = new Subject<string>();
  @ViewChild(ModalRefDirective, {static: false}) refDir: ModalRefDirective;

  public searchRun() {
    if (this.searchValue.length > 3) {
      this.stream$.next(this.searchValue);
    }
  }

  public closeModal() {
    setTimeout(() => this.refDir.containerRef.clear(), 500);
  }

  public showModal() {
    const modalFactory = this.resolver.resolveComponentFactory(CalendarSearchDropComponent);
    this.refDir.containerRef.clear();
    const component = this.refDir.containerRef.createComponent(modalFactory);
    component.instance.eventList = this.eventList;
    component.instance.getEventListItem.subscribe(item => {
      this.calendarApi.focusOnEvent(item);
    });
  }

  ngOnInit() {
    this.stream$.pipe(debounceTime(500)).subscribe(value => this.calendarApi.searchEvents(value));
    this.calendarApi.getSearchEvents().subscribe(val => {
      this.eventList = val;
      this.showModal();
    });
  }
}
