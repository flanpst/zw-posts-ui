import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CrudService } from './abstract/crud.service';
import { CmsPostsCategorias } from './class/cms-posts-categorias';

@Injectable({
  providedIn: 'root'
})
export class CmsPostsCategoriasService extends CrudService<CmsPostsCategorias, number>{

  constructor(
    @Inject('env') protected environment,
    protected _http: HttpClient
  ) {
    super(environment, _http)
  }

  getResourceUrl(): string {
    return '/post-category'
  }
}
