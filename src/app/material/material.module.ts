import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
const components = [
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,components
  ],
  exports:[
    components
  ]
})
export class MaterialModule { }
