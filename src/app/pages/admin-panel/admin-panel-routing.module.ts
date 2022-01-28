import { IsAdminGuard } from './../../core/Guards/is-admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../error/error.component';

const routes: Routes = [
  {path:'',canActivate:[IsAdminGuard],children:[
    {path:'dashboard',component:DashboardComponent}
  ]},

  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
