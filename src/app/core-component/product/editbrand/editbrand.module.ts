import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditbrandRoutingModule } from './editbrand-routing.module';
import { EditbrandComponent } from './editbrand.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditbrandComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditbrandRoutingModule
  ]
})
export class EditbrandModule { }
