import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { SearchPanelComponent } from './core/search-panel/search-panel.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DateSwitcherComponent } from './calendar/date-switcher/date-switcher.component';
import { CalendarListComponent } from './calendar/calendar-list/calendar-list.component';
import { CalendarListItemComponent } from './calendar/calendar-list-item/calendar-list-item.component';
import { CalendarAddEventComponent } from './calendar/modals/calendar-add-event/calendar-add-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalRefDirective } from './calendar/modals/modal-ref.directive';
import { CalendarUpdateEventComponent } from './calendar/modals/calendar-update-event/calendar-update-event.component';
import { CalendarSearchDropComponent } from './calendar/modals/calendar-search-drop/calendar-search-drop.component';
import { CurrentDayDirective } from './directives/current-day.directive';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchPanelComponent,
    CalendarComponent,
    DateSwitcherComponent,
    CalendarListComponent,
    CalendarListItemComponent,
    CalendarAddEventComponent,
    ModalRefDirective,
    CalendarAddEventComponent,
    CalendarUpdateEventComponent,
    CalendarSearchDropComponent,
    CurrentDayDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  entryComponents: [
    CalendarAddEventComponent,
    CalendarUpdateEventComponent,
    CalendarSearchDropComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
