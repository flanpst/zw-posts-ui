import { CrudOperation } from "./crud-operations.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable()

export abstract class CrudService<T, ID> implements CrudOperation<T, ID>{


    constructor(
      @Inject('env') protected environment,
      protected _http: HttpClient,

    ){}

    private readonly APIUrl = `${this.environment.server_url}` + this.getResourceUrl();

    abstract getResourceUrl(): string;

    save(t: T): Observable<T>{
        return this._http.post<T>(this.APIUrl, t);
    }

    update(id: ID, t: T): Observable<T>{
        return this._http.put<T>(this.APIUrl + '/' + id, t, {});
    }

    updateChild(id: ID, t: T, child): Observable<T>{
        return this._http.put<T>(this.APIUrl + '/' + child + '/' + id, t, {});
    }

    findOne(id: ID): Observable<T> {
        return this._http.get<T>(this.APIUrl + '/' + id);
    }

    findAll(): Observable<T[]> {
        return this._http.get<T[]>(this.APIUrl);
    }

    //Get all results without pagination for form lists
    getList(): Observable<T[]>{
        return this._http.get<T[]>(this.APIUrl + '-list');
    }

    delete(id: ID): Observable<any> {
        return this._http.delete<T>(this.APIUrl + '/' + id);
    }

    getPage(id: ID): Observable<T[]>{
        return this._http.get<T[]>(this.APIUrl + '?page=' + id)
    }

    getSearch(t: T): Observable<T[]>{
        return this._http.get<T[]>(this.APIUrl + '/busca/' + t)
    }
}
