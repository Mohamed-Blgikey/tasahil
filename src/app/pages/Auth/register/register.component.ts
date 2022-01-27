import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/Apis/Auth';
import { savedFile } from 'src/app/core/Apis/saveFile';
import { AuthService } from 'src/app/core/Services/auth.service';
import { HttpService } from 'src/app/core/Services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit ,OnDestroy{


  error:string = ''
  file:any;
  fileName:string = '';

  signUpForm:FormGroup = new FormGroup({
    userName:new FormControl(null,[Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-Z0-9]{0,}$/)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    isAgree:new FormControl(false),
    photoName:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)])
  })
  constructor(private _HttpService:HttpService,private _rotue:Router,private _AuthService:AuthService) { }

  ngOnInit(): void {
  }

  signUp(form:FormGroup){
    let data = {
      userName : form.controls['userName'].value,
      email : form.controls['email'].value,
      password : form.controls['password'].value,
      isAgree : form.controls['isAgree'].value,
      phone : form.controls['phone'].value,
      photoName : this.fileName
    }
    // console.log(data);


    this._HttpService.Post(Auth.Register,data ).subscribe(res=>{
      // console.log(res);

      if (res.message == 'Success') {
        this.fileName = '';
        this._HttpService.nUser.next(res.token);
        this._rotue.navigate(['/login'])
      }
      else
      {
        this.error = res.message;
      }
    })

  }


  //upload File
  GetFile(event:any){
    this.stopAddunusablePhoto();
    this.file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',this.file,this.file.name);
    this._HttpService.Post(savedFile.SavePhoto,formData).subscribe(res=>{
      this.fileName = res.message;
    })
    // console.log(this.fileName);
  }

  ngOnDestroy(): void {
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
