import { TestBed } from '@angular/core/testing';

import { FetchCovidDataService } from './fetch-covid-data.service';

describe('FetchCovidDataService', () => {
  let service: FetchCovidDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchCovidDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
