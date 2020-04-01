import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarUpdateEventComponent } from './calendar-update-event.component';

describe('CalendarUpdateEventComponent', () => {
  let component: CalendarUpdateEventComponent;
  let fixture: ComponentFixture<CalendarUpdateEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarUpdateEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarUpdateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
