
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comments } from 'src/app/core/Apis/Comments';
import { Posts } from 'src/app/core/Apis/Posts';
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
  sub1:any;
  sub2:any;
  id:string = '';

  constructor(private _HttpService:HttpService,private _active:ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this._active.snapshot.params['id'];
    // console.log(this.id);



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
  }

  ngOnDestroy(): void {
      this.sub1.unsubscribe();
      this.sub2.unsubscribe();
  }
}
