import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportproductRoutingModule } from './importproduct-routing.module';
import { ImportproductComponent } from './importproduct.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImportproductComponent
  ],
  imports: [
    CommonModule,
    ImportproductRoutingModule,
    FormsModule
  ]
})
export class ImportproductModule { }
