import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MarketingComponent } from '../marketing.component';



@NgModule({
  declarations: [MarketingComponent],
  imports: [
    CommonModule, sharedModule,ReactiveFormsModule
  ],
  exports: [MarketingComponent]
})
export class MarketingModule { }
