import { TestBed } from '@angular/core/testing';

import { TestrecordserviceService } from './testrecordservice.service';

describe('TestrecordserviceService', () => {
  let service: TestrecordserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestrecordserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
