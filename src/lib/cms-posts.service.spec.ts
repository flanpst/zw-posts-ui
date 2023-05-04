import { TestBed } from '@angular/core/testing';

import { CmsPostsService } from './cms-posts.service';

describe('CmsPostsService', () => {
  let service: CmsPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmsPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
