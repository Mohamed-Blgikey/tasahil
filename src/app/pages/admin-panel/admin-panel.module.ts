import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class AdminPanelModule { }
