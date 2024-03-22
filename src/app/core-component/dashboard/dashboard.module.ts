import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FeatherModule } from 'angular-feather';
import { User, UserCheck, FileText, File } from 'angular-feather/icons';
import { sharedModule } from 'src/app/shared/shared.index';
import { ProductlistModule } from '../product/productlist/productlist.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from './modal/modal/modal.module';


const icons = {
  User,
  UserCheck,
  FileText,
  File,
};
@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule,ModalModule, sharedModule, ProductlistModule,ReactiveFormsModule],
  exports: [FeatherModule],
})
export class DashboardModule {}
