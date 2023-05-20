import { CrudOperation } from "./crud-operations.interface";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ENVIRONMENT } from "../cms-posts.module";

@Injectable()

export abstract class CrudService<T, ID> implements CrudOperation<T, ID>{


    constructor(
      @Inject(ENVIRONMENT) protected environment,
      protected _http: HttpClient,

    ){}

    private readonly APIUrl = `${this.environment.server_url}` + this.getResourceUrl();

    abstract getResourceUrl(): string;

    save(t: T): Observable<T>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
      return this._http.post<T>(this.APIUrl, t, {headers: headers});
    }

    update(id: ID, t: T): Observable<T>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
      return this._http.put<T>(this.APIUrl + '/' + id, t, {headers: headers});
    }

    updateChild(id: ID, t: T, child): Observable<T>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
      return this._http.put<T>(this.APIUrl + '/' + child + '/' + id, t, {headers: headers});
    }

    findOne(id: ID): Observable<T> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
      return this._http.get<T>(this.APIUrl + '/' + id, {headers: headers});
    }

    findAll(): Observable<T[]> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
      return this._http.get<T[]>(this.APIUrl, {headers: headers});
    }

    //Get all results without pagination for form lists
    getList(): Observable<T[]>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
      return this._http.get<T[]>(this.APIUrl + '-list', {headers: headers});
    }

    delete(id: ID): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
      return this._http.delete<T>(this.APIUrl + '/' + id, {headers: headers});
    }

    getPage(id: ID): Observable<T[]>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
      return this._http.get<T[]>(this.APIUrl + '?page=' + id, {headers: headers})
    }

    getSearch(t: T): Observable<T[]>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
      return this._http.get<T[]>(this.APIUrl + '/busca/' + t, {headers: headers})
    }
}
