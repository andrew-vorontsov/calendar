import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAddEventComponent } from './calendar-add-event.component';

describe('CalendarAddEventComponent', () => {
  let component: CalendarAddEventComponent;
  let fixture: ComponentFixture<CalendarAddEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarAddEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
