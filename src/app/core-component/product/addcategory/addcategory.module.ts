import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddcategoryRoutingModule } from './addcategory-routing.module';
import { AddcategoryComponent } from './addcategory.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddcategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AddcategoryRoutingModule
  ]
})
export class AddcategoryModule { }
