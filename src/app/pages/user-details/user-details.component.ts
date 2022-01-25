import { Users } from 'src/app/core/Apis/Users';
import { HttpService } from 'src/app/core/Services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit,OnDestroy {

  imgPrefix = environment.PhotoUrl;
  userId:string = '';
  user:any;
  posts:any [] = [];
  sub1:any
  sub2:any
  constructor(private _HttpService:HttpService ,private _active:ActivatedRoute) { }

  ngOnInit(): void {
    this.sub1 = this._active.params.subscribe((params:Params)=>{
      // console.log(params['id']);
      this.userId = params['id'];
      this.sub2 = this._HttpService.Get(Users.GetUserById+this.userId).subscribe(res=>{
        // console.log(res.data);
        this.user = res.data[0];

        this.posts = this.user.posts;

        // console.log(this.user);
        // console.log(this.posts);

      })
    })
  }

  ngOnDestroy(): void {
      this.sub1.unsubscribe()
      this.sub2.unsubscribe();
  }

}
