import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal.component';
import { sharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ModalComponent],
  imports: [  
    CommonModule, sharedModule,ReactiveFormsModule
  ],
  exports: [ModalComponent]
})
export class ModalModule { }
