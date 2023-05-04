import { TestBed } from '@angular/core/testing';

import { CmsPostsCategoriasService } from './cms-posts-categorias.service';

describe('CmsPostsCategoriasService', () => {
  let service: CmsPostsCategoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmsPostsCategoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
