import { BaseResourceModel } from '../models/base-resource.model';
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export abstract class BaseResourceService<T extends BaseResourceModel>{

protected http: HttpClient;

  constructor(protected apiPath: string, protected injector: Injector){
    this.http = injector.get(HttpClient);
  }
    
  getAll(): Observable<T[]>{
    return this.http.get(this.apiPath).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToResources)
    )
  }

  getById(id:number): Observable<T>{
    
    const url = `${this.apiPath}/${id}`;
    
    return this.http.get(url).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToResource)
    )
  }

  create(resource: T): Observable<T>{
    return this.http.post(this.apiPath, resource).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToResource)
    )
  }

  update(resource: T): Observable<T>{

    const url = `${this.apiPath}/${resource.id}`;

    return this.http.put(url, resource).pipe(
      catchError(this.handlerError),
      map(() => resource)
    )
  }

  delete(id:number) : Observable<any>{

    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handlerError),
      map(() => null)
    )
  }

  // protected methods

  protected jsonDataToResource(jsonData: any) : T{
    return jsonData as T;
  }

  protected jsonDataToResources(jsonData: any[]): T[]{
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(element as T));
    return resources;
  }

  protected handlerError(error: any): Observable<any>{
    console.log("Erro na requisição =>  ", error);
    return throwError(error);
  }
}