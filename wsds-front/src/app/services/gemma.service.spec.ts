import { TestBed } from '@angular/core/testing';

import { GemmaService } from './gemma.service';

describe('GemmaService', () => {
  let service: GemmaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GemmaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
