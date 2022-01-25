import { HttpService } from 'src/app/core/Services/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Posts } from 'src/app/core/Apis/Posts';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit ,OnDestroy{


  imgPrefix:string = environment.PhotoUrl;
  posts:any[] = [];
  sub1:any;
  sub2:any;
  id:number = 0;

  constructor(private _HttpService:HttpService,private _active:ActivatedRoute) { }


  ngOnInit(): void {
    this.sub1 = this._active.params.subscribe((params:Params)=>{
      // console.log(params['id']);
      this.id = params['id'];
      this.sub2 = this._HttpService.Get(Posts.GetAllPosts).subscribe(res=>{
        // console.log(res.data);
        this.posts = res.data;
        this.posts = this.posts.filter(p=>p.cateId == this.id)
          // console.log(this.posts);
      })
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
