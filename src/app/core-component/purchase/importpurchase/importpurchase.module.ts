import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportpurchaseRoutingModule } from './importpurchase-routing.module';
import { ImportpurchaseComponent } from './importpurchase.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImportpurchaseComponent
  ],
  imports: [
    CommonModule,
    ImportpurchaseRoutingModule,
    FormsModule
  ]
})
export class ImportpurchaseModule { }
