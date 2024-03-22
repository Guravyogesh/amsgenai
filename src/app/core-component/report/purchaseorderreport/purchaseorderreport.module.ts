import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseorderreportRoutingModule } from './purchaseorderreport-routing.module';
import { PurchaseorderreportComponent } from './purchaseorderreport.component';


import { DatepickerModule } from 'ng2-datepicker';
import { sharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from '../../dashboard/modal/modal/modal.module';
import { MarketingModule } from '../../dashboard/marketing/marketing/marketing.module';

@NgModule({
  declarations: [PurchaseorderreportComponent],
  imports: [
    CommonModule,
    PurchaseorderreportRoutingModule,
    sharedModule,
    ModalModule,
    DatepickerModule,
    MarketingModule
  ],
  bootstrap: [PurchaseorderreportComponent],
})
export class PurchaseorderreportModule {}
