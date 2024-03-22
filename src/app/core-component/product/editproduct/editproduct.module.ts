import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditproductRoutingModule } from './editproduct-routing.module';
import { EditproductComponent } from './editproduct.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditproductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EditproductRoutingModule
  ]
})
export class EditproductModule { }
