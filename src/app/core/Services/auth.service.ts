import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject(null);
  constructor(private _Router:Router) {
    if (localStorage.getItem('userToken')) {
      this.saveUserData();
    }

  //  console.log( this.user['_value']?.roles?.includes("user"));

  }
  saveUserData(){
    let token:any = localStorage.getItem('userToken');
    this.user.next(jwtDecode(token))
    // console.log(this.user.getValue());
  }

  logOut(){
    this.user.next(null);
    localStorage.removeItem("userToken");
    this._Router.navigate(['/login'])
  }
}
