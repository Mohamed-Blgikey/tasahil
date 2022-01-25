import { SavedPosts } from './../../../core/Apis/SavedPosts';
import { FormGroup, FormControl } from '@angular/forms';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Comments } from 'src/app/core/Apis/Comments';
import { Posts } from 'src/app/core/Apis/Posts';
import { AuthService } from 'src/app/core/Services/auth.service';
import { HttpService } from 'src/app/core/Services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit,OnDestroy {

  imgPrefix:string = environment.PhotoUrl;
  post:any;
  comments:any[] =[];
  sub:any;
  sub1:any;
  sub2:any;
  sub3:any;
  sub4:any;
  id:string = '';
  CurrentUserId = '';


  constructor(private _HttpService:HttpService,private _active:ActivatedRoute,private _AuthService:AuthService) { }

  ngOnInit(): void {


    this.CurrentUserId = this._AuthService?.user['_value'].nameid;
    // console.log(this.CurrentUserId);


    // console.log(this.id);




    this.sub = this._active.params.subscribe((params:Params)=>{
      this.id = params['id'];
      this.sub1 = this._HttpService.Get(Posts.GetPostById+this.id).subscribe(res=>{
        // console.log(res.data);
        this.post = res.data
      })

      this.sub2 = this._HttpService.Get(Comments.GetAllComments).subscribe(res=>{
        // console.log(res.data);
        this.comments = res.data;
        this.comments = this.comments.filter(c=>c.postId == this.id)
        // console.log(this.comments);
      })

    })

  }


  saveIt(){
    let post = {
      postId:this.id,
      applicationUserId : this.CurrentUserId
    }
    this._HttpService.Post(SavedPosts.Saved,post).subscribe(res=>{
      console.log(res);

    })
    // console.log(post);
    // this.sub3.unsubscribe();

  }
  unSaveIt(){
    let post = {
      postId:this.id,
      applicationUserId : this.CurrentUserId
    }

    this._HttpService.Delete(SavedPosts.unSaved,post)
    .subscribe(res=>{
      console.log(res);
    })

    // this.sub4.unsubscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
