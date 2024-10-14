import { TestBed } from '@angular/core/testing';

import { DepotDomiciliationTitreService } from './depot-domiciliation-titre.service';

describe('DepotDomiciliationTitreService', () => {
  let service: DepotDomiciliationTitreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepotDomiciliationTitreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
