import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSearchDropComponent } from './calendar-search-drop.component';

describe('CalendarSearchDropComponent', () => {
  let component: CalendarSearchDropComponent;
  let fixture: ComponentFixture<CalendarSearchDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarSearchDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSearchDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
