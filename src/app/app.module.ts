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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchPanelComponent,
    CalendarComponent,
    DateSwitcherComponent,
    CalendarListComponent,
    CalendarListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
