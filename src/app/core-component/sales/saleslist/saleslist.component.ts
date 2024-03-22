import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  apiResultFormat,
  DataService,
  pageSelection,
  routes,
  SpinnerService,
} from 'src/app/core/core.index';
import { ObjectDataService } from 'src/app/core/service/data/objectdata.service';
import { PaginationService, tablePageSize } from 'src/app/shared/shared.index';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';

@Component({
  selector: 'app-saleslist',
  templateUrl: './saleslist.component.html',
  styleUrls: ['./saleslist.component.scss'],
})
export class SaleslistComponent implements OnInit {
  initChecked: boolean = false;
  public tableData: Array<any> = [];
  public dataTable: any = [];
  contentStep=1;
  contentStepfordesign: number = 1;
  public routes = routes;
  // pagination variables
  public pageSize: number = 10;
  public serialNumberArray: Array<any> = [];
  public totalData: any = 0;
  showFilter: boolean = false;
  dataSource!: MatTableDataSource<any>;
  public searchDataValue = '';
  newLine: any =`\n`;
  OutputData: any;
  message: any;
  marketingStrategies = [
    { label: 'Fulfillment Strategy', input: '' },
    { label: 'Fulfillment by Amazon (FBA)', input: '' },
    { label: 'Fulfillment by Merchant (FBM)', input: '' },
    { label: 'Prime Eligibility', input: '' },
    { label: 'Cost Considerations', input: '' },
    { label: 'Inventory Management', input: '' },
    { label: 'Shipping Carrier Selection', input: '' },
    { label: 'Shipping Timeframes', input: '' },
    { label: 'International Shipping', input: '' },
    { label: 'Shipping Cost Strategy', input: '' },
    { label: 'Order Processing Time', input: '' },
    { label: 'Tracking and Notifications', input: '' },
    { label: 'Returns and Refunds Policy', input: '' },
    { label: 'Packaging and Branding', input: '' },
    { label: 'Customer Service for Shipping Issues', input: '' },
    { label: 'Integration with Amazon Services', input: '' },
    { label: 'Continuous Improvement', input: '' }
  ];
  //** / pagination variables  public dataTable: any = [];

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private sweetalert: SweetalertService,
    private router: Router,private globalObject:ObjectDataService,private spinner: SpinnerService
  ) {

  }
  copyTextToClipboard(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);  
  }
  ngOnInit(): void {
    this.OutputData = this.globalObject.getData();
      let stringified = JSON.stringify(this.OutputData);
      let stringAllongWithQuestion = `${stringified}${this.newLine} I am building an application taking the above input can you provide me answer for the below question in a balanced tone this information is for a new seller on Amazon e-market place, please moderate the answer for ${this.OutputData.geography} in ${this.OutputData.OutputLanguage}${this.newLine}
      01. What should be the Fulfillment Strategy for above brand?
      02. What should be the Fulfillment by Amazon (FBA) for above brand?
      03. What should be the Fulfillment by Merchant (FBM) for above brand?
      04. What should be the Prime Eligibility for above brand?
      05. What should be the Cost Considerations for above brand?
      06. How can we manage Inventory for above brand?
      07. What should be the best Shipping Carrier Selection for above brand?
      08. What should be the best Shipping Timeframes for above brand?
      09. How can we manage International Shipping?
      10. What should be Shipping Cost Strategy?
      11. What should be the Order Processing Time?
      12. How can we manage Tracking and Notifications for the industry based on the above selected geography?
      13. What are all the Returns and Refunds Policy for the industry based on the above selected geography?
      14. What should be the best Packaging and Branding we can use?
      15. How can we manage Customer Service for Shipping Issues?
      16. How can we make the best Integration with Amazon Services for the above industry considering the geography?
      17. What should we do for Continuous Improvement for the above brand?
      Please provide the answer for these questions indidually less than 60 words`;
      this.globalObject.generateText(stringAllongWithQuestion).subscribe((result: any) => {
        this.spinner.show();
        this.message = result.choices[0].message.content;
        let brandQuestions = this.message.replace(/^\d+\.\s/gm, '').split('\n').filter((question:any) => question.trim().length > 0);
        this.marketingStrategies.forEach((question, index) => {
        question.input = brandQuestions[index];
         this.spinner.hide();
        });
      },(error:any)=>{
        this.spinner.hide()
              });
  }
  onSubmit(){

  }
  setCurrentStep(step: number): void {
    this.contentStep = step;
  }
  setCurrentStepfordesign(step: number): void{
    this.contentStepfordesign = step; 
  }
}
