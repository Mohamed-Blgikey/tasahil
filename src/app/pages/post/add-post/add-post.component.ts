import { Router } from '@angular/router';
import { Posts } from './../../../core/Apis/Posts';
import { Categories } from './../../../core/Apis/Category';
import { HttpService } from './../../../core/Services/http.service';
import { AuthService } from 'src/app/core/Services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { savedFile } from 'src/app/core/Apis/saveFile';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit ,OnDestroy{

  categories:any[] = [];
  file:any;
  fileName:string = '';
  send:boolean = false;
  sub1:any;


  createPost:FormGroup = new FormGroup({
    id:new FormControl(0),
    userId:new FormControl(null),
    title:new FormControl(null,[Validators.required,Validators.maxLength(50),Validators.minLength(3)]),
    price:new FormControl(null,[Validators.required,Validators.max(1000000),Validators.min(100)]),
    description:new FormControl(null,[Validators.required,Validators.max(1000),Validators.minLength(5)]),
    cateId:new FormControl(null,[Validators.required]),
    photoName:new FormControl(null,[Validators.required]),
  })


  constructor(private _AuthService:AuthService,private _HttpService:HttpService,private _Router:Router) { }

  ngOnInit(): void {
    this.sub1 = this._HttpService.Get(Categories.GetAllCategory).subscribe(res=>{
      this.categories = res.data;
      // console.log(this.categories);
    })
  }



  uploadPhoto(event:any){
    this.stopAddunusablePhoto();
    this.file=event.target.files[0];
    // console.log(this.file);
    const formData:FormData=new FormData();
    formData.append('uploadedFile',this.file,this.file.name);
    this._HttpService.Post(savedFile.SavePhoto,formData).subscribe(res=>{
       this.fileName = res.message;
    })
  }

  // Add Post Method
  create(form:FormGroup){

    let data = {
      id : 0,
      title : form.controls['title'].value,
      price : form.controls['price'].value,
      description : form.controls['description'].value,
      cateId : form.controls['cateId'].value,
      userId : this._AuthService.user['_value'].nameid,
      photoName : this.fileName
    }


    // console.log(data);


    this._HttpService.Post(Posts.CreatePost,data).subscribe(res=>{
      // console.log(res);
      this.fileName = "";
      this._Router.navigate(['/post',data.cateId])
    })


  }

  ngOnDestroy(): void {
      this.sub1.unsubscribe();
      this.stopAddunusablePhoto();
  }


  private stopAddunusablePhoto(){
    if (this.fileName.length > 0) {
      let photo = {
        name : this.fileName
      };
      this._HttpService.Post(savedFile.UnSavePhoto,photo).subscribe(res=>{
        // console.log(res);
      })
    }
  }


}
