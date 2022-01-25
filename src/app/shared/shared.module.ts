import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import { SavedComponent } from './saved/saved.component';



@NgModule({
  declarations: [
    NavbarComponent,
    UsersComponent,
    SavedComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    UsersComponent,
    SavedComponent
  ]
})
export class SharedModule { }
