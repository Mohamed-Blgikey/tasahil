import { AddPostComponent } from './post/add-post/add-post.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { ValidUserGuard } from './../core/Guards/valid-user.guard';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',canActivate:[ValidUserGuard],children:[
    {path:'home',component:HomeComponent},
    {path:'post/:id',component:PostComponent},
    {path:'postDetails/:id' , component:PostDetailsComponent},
    {path:'userDetails/:id' , component:UserDetailsComponent},
    {path:'addPost' , component:AddPostComponent},
  ]},
  {path:'login' , component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
