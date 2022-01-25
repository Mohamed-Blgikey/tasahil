import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  Get(endPoint:string):Observable<any>{
    return this.http.get(this.fullPath(endPoint));
  }


  Post(endPoint:string,obj:any):Observable<any>{
    return this.http.post(this.fullPath(endPoint),obj);
  }


  private fullPath(endPoint:string):string{
    return environment.BaseUrl + endPoint;
  }
}
