import { SavedPosts } from './../../../core/Apis/SavedPosts';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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


  editMood:boolean = false;
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


  Comment:FormGroup = new FormGroup({
    id:new FormControl(null),
    userId :new FormControl(null),
    postId: new FormControl(null),
    commentContent:new FormControl(null,Validators.required)
  })

  constructor(private _HttpService:HttpService,private _active:ActivatedRoute,private _AuthService:AuthService) { }

  ngOnInit(): void {
    this.CurrentUserId = this._AuthService?.user['_value'].nameid;
    // console.log(this.CurrentUserId);
    // console.log(this.id);


    //reload Post and his Comments
    this.sub = this._active.params.subscribe((params:Params)=>{
      this.id = params['id'];
      this.sub1 = this._HttpService.Get(Posts.GetPostById+this.id).subscribe(res=>{
        // console.log(res.data);
        this.post = res.data
      })

      this.sub3 = this._HttpService.nComment.subscribe(()=>{

        this.sub2 = this._HttpService.Get(Comments.GetAllComments).subscribe(res=>{
          // console.log(res.data);
          this.comments = res.data;
          this.comments = this.comments.filter(c=>c.postId == this.id)
          // console.log(this.comments);
        })
      })


    })

  }


  //Save Post
  saveIt(){
    let post = {
      postId:this.id,
      applicationUserId : this.CurrentUserId
    }
    this._HttpService.Post(SavedPosts.Saved,post).subscribe(res=>{
      // console.log(res);
      this._HttpService.nPost.next((post.postId))

    })
    // console.log(post);
    // this.sub3.unsubscribe();

  }

  //UnSave Post
  unSaveIt(){
    let post = {
      postId:this.id,
      applicationUserId : this.CurrentUserId
    }

    // console.log(post);
    this._HttpService.Delete(SavedPosts.unSaved,{postId:this.id,applicationUserId : this.CurrentUserId}).subscribe(res=>{
      console.log(res);

    })

  }


  // make Comment
  createComment(form:FormGroup){

      form.controls['id'].setValue(0)
      form.controls['userId'].setValue(this.CurrentUserId)
      form.controls['postId'].setValue(this.id)
      // console.log(form.value);
      this._HttpService.Post(Comments.CreateComment,form.value).subscribe(res=>{
        // console.log(res);
        this._HttpService.nComment.next(form.value)
      })

    this.Comment.controls['commentContent'].setValue('')

  }


  //delete comment
  deleteComment(form:any){
    if (confirm("You want to delete your comment !!")) {
      let comment = {
        id:form.id,
        userId :form.userId,
        postId: form.postId,
        commentContent:form.commentContent
      }
      // console.log(comment);
      this._HttpService.Post(Comments.DeleteComment,comment).subscribe(res=>{
        // console.log(res);
      this._HttpService.nComment.next(form.value)


      })

    }
  }

  // edit comment
  editComment(form:any){
    this.Comment.controls['id'].setValue(form.id)
    this.Comment.controls['userId'].setValue(form.userId)
    this.Comment.controls['postId'].setValue(form.postId)
    this.Comment.controls['commentContent'].setValue(form.commentContent)
    // console.log(this.Comment.value);
    this.editMood = true;
  }

  //confirm Edit Comment
  confirmEditComment(){
    // console.log(this.Comment.value);
    this._HttpService.Put(Comments.EditComment,this.Comment.value).subscribe(res=>{
      // console.log(res);
      this._HttpService.nComment.next(this.Comment.value);
    })

    this.Comment.controls['commentContent'].setValue('')
    this.editMood = false;
  }



  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
}
