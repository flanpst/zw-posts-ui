import { Inject, Injectable } from '@angular/core';
import { CrudService } from './abstract/crud.service';
import { CmsPosts } from './class/cms-posts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CmsPostsService extends CrudService<CmsPosts, number>{

  constructor(
    @Inject('env') protected environment,
    protected _http: HttpClient
  ) {
    super(environment, _http)
  }

  getResourceUrl(): string {
    return '/post'
  }
}
