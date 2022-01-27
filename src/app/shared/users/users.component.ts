import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/core/Apis/Users';
import { HttpService } from 'src/app/core/Services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  imgPrefix = environment.PhotoUrl;
  show:boolean = false;
  width:string = '';
  users:any;
  constructor(private _HttpService:HttpService) { }

  ngOnInit(): void {
    this._HttpService.nUser.subscribe(()=>{
      this._HttpService.Get(Users.GetAllUser).subscribe(res=>{
        this.users =res.data
        // console.log(this.users);
      })
    })
    let box = document.querySelector('.sideBar')?.clientWidth;
    this.width = `-${box}px`;
    }


  toggel(){
    this.show = !this.show;
  }

}
