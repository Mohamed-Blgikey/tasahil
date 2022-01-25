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
   }

  saveUserData(){
    let token:any = localStorage.getItem('userToken');
    this.user.next(jwtDecode(token))
    // console.log(this.user);
  }

  logOut(){
    this.user.next(null);
    localStorage.removeItem("userToken");
    this._Router.navigate(['/login'])
  }
}
