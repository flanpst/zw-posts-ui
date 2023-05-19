import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CrudService } from './abstract/crud.service';
import { CmsPostsCategorias } from './class/cms-posts-categorias';
import { ENVIRONMENT } from './cms-posts.module';

@Injectable({
  providedIn: 'root'
})
export class CmsPostsCategoriasService extends CrudService<CmsPostsCategorias, number>{

  constructor(
    @Inject(ENVIRONMENT) protected environment,
    protected _http: HttpClient
  ) {
    super(environment, _http)
  }

  getResourceUrl(): string {
    return '/post-category'
  }
}
