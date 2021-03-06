import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material/material.module';
import { PostComponent } from './post/post.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './Auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPostComponent } from './post/add-post/add-post.component';
import { RegisterComponent } from './Auth/register/register.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    PostDetailsComponent,
    UserDetailsComponent,
    LoginComponent,
    AddPostComponent,
    RegisterComponent,
    EditPostComponent,
    AccessDeniedComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AdminPanelModule
  ],
  exports: [
    HomeComponent,
    PostComponent,
    PostDetailsComponent,
    UserDetailsComponent,
    LoginComponent,
    AddPostComponent,
    RegisterComponent,
    EditPostComponent,
    AccessDeniedComponent,
    ErrorComponent
  ]
})
export class PagesModule { }
