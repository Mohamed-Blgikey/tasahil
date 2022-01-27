import { Posts } from './../../core/Apis/Posts';
import { AuthService } from './../../core/Services/auth.service';
import { Users } from 'src/app/core/Apis/Users';
import { HttpService } from 'src/app/core/Services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { savedFile } from 'src/app/core/Apis/saveFile';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit,OnDestroy {

  CurrentUserId:string = '';
  imgPrefix = environment.PhotoUrl;
  userId:string = '';
  user:any;
  posts:any [] = [];
  sub1:any
  sub2:any
  constructor(private _HttpService:HttpService ,private _active:ActivatedRoute,private _AuthService:AuthService) { }

  ngOnInit(): void {

    this.CurrentUserId = this._AuthService?.user['_value'].nameid;
    // console.log(this.CurrentUserId);
    this._HttpService.nPost.subscribe(()=>{
      this.sub2 = this._HttpService.Get(Users.GetUserById+this._active.snapshot.params['id']).subscribe(res=>{
        // console.log(res.data);
        this.user = res.data[0];

        this.posts = this.user.posts;

        // console.log(this.user);
        // console.log(this.posts);

      })
    })

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


  // Delete Post
  deletePost(form:any){
    if (confirm("Delete Your Post !!")) {
      let photo = {
        name : form.photoName
      }
      this._HttpService.Post(savedFile.UnSavePhoto,photo).subscribe(res=>{
        // console.log(res);
      })
      let data = {
        "id": form.id,
        "title": form.title,
        "price": form.price,
        "description": form.description,
        "cateId": form.cateId,
        "userId": form.userId,
        "photoName": form.photoName
      }
      // console.log(data);
      this._HttpService.Post(Posts.DeletePost,data).subscribe(res=>{
        // console.log(res);
        this._HttpService.nPost.next(res)

      })
    }

  }

  ngOnDestroy(): void {
      this.sub1.unsubscribe()
      this.sub2.unsubscribe();
  }

}
