import { HttpService } from '../../../core/Services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/core/Apis/Auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error:string = ''
  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required])
  })

  constructor(private _HttpService:HttpService,private _rotue:Router,private _AuthService:AuthService) { }

  ngOnInit(): void {
  }

  login(form:FormGroup){
    // console.log(form.value);
    this._HttpService.Post(Auth.login,form.value).subscribe(res=>{
      // console.log(res);

      if (res.message == 'Success') {
        localStorage.setItem('userToken',res.token)
        this._AuthService.saveUserData();
        this._rotue.navigate(['/home'])
      }
      else
      {
        this.error = res.message;
      }
    })
    // this.loginForm.reset();

  }


}
