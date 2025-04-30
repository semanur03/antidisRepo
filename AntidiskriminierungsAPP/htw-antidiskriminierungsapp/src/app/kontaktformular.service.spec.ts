import { TestBed } from '@angular/core/testing';

import { KontaktformularService } from './kontaktformular.service';

describe('KontaktformularService', () => {
  let service: KontaktformularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KontaktformularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
