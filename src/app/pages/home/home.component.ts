import { HttpService } from './../../core/Services/http.service';
import { Posts } from './../../core/Apis/Posts';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,OnDestroy{
  imgPrefix:string = environment.PhotoUrl;
  posts:any[] = [];
  sub:any;
  constructor(private _HttpService:HttpService) { }

  ngOnInit(): void {
    this.sub = this._HttpService.Get(Posts.GetAllPosts).subscribe(res=>{
      // console.log(res.data);
      this.posts = res.data;
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }
}
