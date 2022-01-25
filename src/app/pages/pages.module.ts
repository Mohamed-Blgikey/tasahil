import { PostDetailsComponent } from './post/post-details/post-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material/material.module';
import { PostComponent } from './post/post.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPostComponent } from './post/add-post/add-post.component';


@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    PostDetailsComponent,
    UserDetailsComponent,
    LoginComponent,
    AddPostComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HomeComponent,
    PostComponent,
    PostDetailsComponent,
    UserDetailsComponent,
    LoginComponent,
    AddPostComponent
  ]
})
export class PagesModule { }
