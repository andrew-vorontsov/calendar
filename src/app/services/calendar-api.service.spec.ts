import { TestBed } from '@angular/core/testing';

import { CalendarApiService } from './calendar-api.service';

describe('CalendarApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarApiService = TestBed.get(CalendarApiService);
    expect(service).toBeTruthy();
  });
});
