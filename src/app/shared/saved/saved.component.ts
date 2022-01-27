import { Component, OnInit } from '@angular/core';
import { SavedPosts } from 'src/app/core/Apis/SavedPosts';
import { Users } from 'src/app/core/Apis/Users';
import { AuthService } from 'src/app/core/Services/auth.service';
import { HttpService } from 'src/app/core/Services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {

  imgPrefix = environment.PhotoUrl;
  valid:boolean = false;
  show:boolean = false;
  width:string = '0px';
  saved:any [] = [];
  constructor(private _HttpService:HttpService,private _AuthService:AuthService) { }

  ngOnInit(): void {

  this._HttpService.nPost.subscribe(()=>{
      this._AuthService.user.subscribe(()=>{
        if (this._AuthService.user.getValue() != null) {
          this._HttpService.Get(SavedPosts.GetSaved).subscribe(res=>{
            this.saved =res.data
            this.saved = this.saved.filter(s=>s.applicationUserId == this._AuthService.user['_value'].nameid)
            this.valid = true;
            // console.log(this.saved);
          })

        }
        else{
          this.valid = false;
          this.saved = [];
        }
        let box = document.querySelector('.sideBar')?.clientWidth;
        this.width = `-${box}px`;
      })

    })

  }


  toggel(){
    this.show = !this.show;
  }

}
