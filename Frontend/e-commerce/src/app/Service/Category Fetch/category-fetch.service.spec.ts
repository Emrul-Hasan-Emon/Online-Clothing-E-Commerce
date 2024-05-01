import { TestBed } from '@angular/core/testing';

import { CategoryFetchService } from './category-fetch.service';

describe('CategoryFetchService', () => {
  let service: CategoryFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
