import { Inject, Injectable } from '@angular/core';
import { CrudService } from './abstract/crud.service';
import { CmsPosts } from './class/cms-posts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENVIRONMENT } from './cms-posts.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CmsPostsService extends CrudService<CmsPosts, number>{

  constructor(
    @Inject(ENVIRONMENT) protected environment,
    protected _http: HttpClient
  ) {
    super(environment, _http)
  }

  getResourceUrl(): string {
    return '/post'
  }

  findAllCategory(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get<any[]>(this.environment.server_url + '/post-category', {headers: headers});
  }

  getPageCategory(id: number): Observable<any[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get<any[]>(this.environment.server_url + '/post-category' + '?page=' + id, {headers: headers})
  }

  findOneCategory(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get<any>(this.environment.server_url + '/post-category/' + id, {headers: headers});
  }

  saveCategory(t: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.post<any>(this.environment.server_url + '/post-category', t, {headers: headers});
  }

  updateCategory(id: number, t: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.put<any>(this.environment.server_url + '/post-category/' + id, t, {headers: headers});
  }

  getListCategory(): Observable<any[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.get<any[]>(this.environment.server_url + '/post-category' + '-list', {headers: headers});
  }


}
