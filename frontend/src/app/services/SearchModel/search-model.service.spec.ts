import { TestBed, inject } from '@angular/core/testing';

import { SearchModelService } from './search-model.service';

describe('SearchModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchModelService]
    });
  });

  it('should be created', inject([SearchModelService], (service: SearchModelService) => {
    expect(service).toBeTruthy();
  }));
});
