import { TestBed } from '@angular/core/testing';

import { AstarService } from './astar.service';

describe('AstarService', () => {
  let service: AstarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
