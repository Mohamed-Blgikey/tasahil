import { Posts } from 'src/app/core/Apis/Posts';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Categories } from 'src/app/core/Apis/Category';
import { savedFile } from 'src/app/core/Apis/saveFile';
import { HttpService } from 'src/app/core/Services/http.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit ,OnDestroy{


  categories:any[] = [];
  postId:number = 0;
  post:any;
  sub1:any;
  file:any;
  fileName:string = '';
  userId :string = '';



  editPost:FormGroup = new FormGroup({
    id:new FormControl(0),
    userId:new FormControl(null),
    title:new FormControl(null,[Validators.required,Validators.maxLength(50),Validators.minLength(3)]),
    price:new FormControl(null,[Validators.required,Validators.max(1000000),Validators.min(100)]),
    description:new FormControl(null,[Validators.required,Validators.max(1000),Validators.minLength(5)]),
    cateId:new FormControl(null,[Validators.required]),
    photoName:new FormControl(null),
  })

  constructor(private _HttpService:HttpService,private _Router:Router,private _ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.postId = this._ActivatedRoute.snapshot.params['id'];
    // console.log(this.postId);
    this._HttpService.Get(Posts.GetPostById+this.postId).subscribe(res=>{
      // console.log(res.data);
      this.post = res.data;

      this.editPost.controls['title'].setValue(this.post.title);
      this.editPost.controls['price'].setValue(this.post.price);
      this.editPost.controls['description'].setValue(this.post.description);
      this.editPost.controls['cateId'].setValue(this.post.cateId);
      this.fileName = this.post.photoName;
      this.userId = this.post.userId;

    })


    this.sub1 = this._HttpService.Get(Categories.GetAllCategory).subscribe(res=>{
      this.categories = res.data;
      // console.log(this.categories);
    })
  }


  Edit(form:FormGroup){
    let data = {
      id : this.post.id,
      title : form.controls['title'].value,
      price : form.controls['price'].value,
      description : form.controls['description'].value,
      cateId : form.controls['cateId'].value,
      userId : this.userId,
      photoName : this.fileName
    }
    // console.log(data);
    this._HttpService.Put(Posts.EditPost,data).subscribe(res=>{
      console.log(res);
      this._Router.navigate(['/userDetails',this.userId])
    })

  }

  //Upload File
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

  ngOnDestroy(): void {
      this.sub1.unsubscribe();
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
