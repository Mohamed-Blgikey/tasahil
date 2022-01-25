import { AuthService } from 'src/app/core/Services/auth.service';
import { Categories } from './../../core/Apis/Category';
import { HttpService } from './../../core/Services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  islogin:boolean = true;
  categories:any;
  CurrentUserId = '';
  constructor(private _HttpService:HttpService,private _AuthService:AuthService) { }

  ngOnInit(): void {
    this._AuthService.user.subscribe(()=>{
      if (this._AuthService.user.getValue() == null) {
        this.islogin = false;
      }
      else{
        this.islogin = true;
        this.CurrentUserId = this._AuthService?.user['_value'].nameid;
        // console.log(this.CurrentUserId);
      }
    })
    this._HttpService.Get(Categories.GetAllCategory).subscribe(res=>{
      // console.log(res.data);
      this.categories = res.data;
    })
  }

  logOut(){
    this._AuthService.logOut();
  }

}