import { TestBed } from '@angular/core/testing';

import { SousreparationService } from './sousreparation.service';

describe('SousreparationService', () => {
  let service: SousreparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SousreparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
