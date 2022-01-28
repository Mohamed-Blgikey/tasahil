import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  nPost = new BehaviorSubject("");
  nUser = new BehaviorSubject("");
  nComment = new BehaviorSubject("");
  nCate = new BehaviorSubject("");

  constructor(private http:HttpClient) { }

  Get(endPoint:string):Observable<any>{
    return this.http.get(this.fullPath(endPoint));
  }


  Post(endPoint:string, body: any = null):Observable<any>{
    return this.http.post(this.fullPath(endPoint),body);
  }

  Delete(endPoint:string,body:any = null):Observable<any>{
    return this.http.delete(this.fullPath(endPoint),body);
  }

  Put (endPoint:string,body:any = null):Observable<any>{
    return this.http.put(this.fullPath(endPoint),body);
  }


  private fullPath(endPoint:string):string{
    return environment.BaseUrl + endPoint;
  }





}
