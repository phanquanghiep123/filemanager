import { TestBed, inject } from '@angular/core/testing';

import { TreesService } from './trees.service';

describe('TreesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreesService]
    });
  });

  it('should be created', inject([TreesService], (service: TreesService) => {
    expect(service).toBeTruthy();
  }));
});
