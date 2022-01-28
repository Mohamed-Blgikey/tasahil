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
  isAdmin:boolean = true;
  categories:any;
  CurrentUserId = '';
  constructor(private _HttpService:HttpService,private _AuthService:AuthService) { }

  ngOnInit(): void {
    this._AuthService.user.subscribe(()=>{
      if (this._AuthService.user.getValue() == null) {
        this.islogin = false;
        this.isAdmin = false;
      }
      else{
        this.islogin = true;
        this.CurrentUserId = this._AuthService?.user['_value'].nameid;
        if (this._AuthService.user['_value']?.roles?.includes("admin") || this._AuthService.user['_value']?.roles?.includes("ADMIN")) {
          this.isAdmin = true;
        }else{
          this.isAdmin = false;
        }
        // console.log(this.CurrentUserId);
      }
    })

    this._HttpService.nCate.subscribe(()=>{
      this._HttpService.Get(Categories.GetAllCategory).subscribe(res=>{
        // console.log(res.data);
        this.categories = res.data;
      })
    })
  }

  logOut(){
    this._AuthService.logOut();
  }

}
