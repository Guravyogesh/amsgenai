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

@Component({
  selector: 'app-invoicereport',
  templateUrl: './invoicereport.component.html',
  styleUrls: ['./invoicereport.component.scss'],
})
export class InvoicereportComponent implements OnInit {
  initChecked: boolean = false;
  public tableData: Array<any> = [];
  public routes = routes;
  // pagination variables
  public pageSize: number = 10;
  public serialNumberArray: Array<any> = [];
  public totalData: any = 0;
  showFilter: boolean = false;
  dataSource!: MatTableDataSource<any>;
  public searchDataValue = ''; contentStep=1;
  contentStepfordesign: number = 1;
  newLine: any =`\n`;
OutputData: any;
message: any;
  reviewStrategies = [
    { label: 'Requesting Reviews Responsibly', input: '' },
    { label: 'Follow-up Emails', input: '' },
    { label: 'Clear and Polite Language', input: '' },
    { label: 'Automated Email Campaigns', input: '' },
    { label: 'Timing of Review Requests', input: '' },
    { label: 'Incorporate Branding', input: '' },
    { label: 'Provide Review Guidelines', input: '' },
    { label: 'Monitor Customer Sentiment', input: '' },
    { label: 'Respond to Customer Reviews', input: '' },
    { label: 'Addressing Negative Feedback', input: '' },
    { label: 'Utilize Early Reviewer Program', input: '' },
    { label: 'Incentivizing Reviews Legally', input: '' },
    { label: 'Monitor and Respond to Questions', input: '' },
    { label: 'Leverage Customer Feedback', input: '' },
    { label: 'Track Review Metrics', input: '' },
    { label: 'Stay Compliant with Policies', input: '' }
  ];

 
  //** / pagination variables
  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    private globalObject:ObjectDataService,
    private spinner: SpinnerService
  ) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {

    });
  }
  date = new Date();
  ngOnInit(): void {
    this.OutputData = this.globalObject.getData();
      let stringified = JSON.stringify(this.OutputData);
      let stringAllongWithQuestion = `${stringified}${this.newLine} I am building an application taking the above input can you provide me answer for the below question in a balanced tone this information is for a new seller on Amazon e-market place, please moderate the answer for ${this.OutputData.geography} in ${this.OutputData.OutputLanguage}${this.newLine}
      01. How can we effectively and responsibly request reviews for above brand?
      02. When we sending follow-up emails for above brand?
      03. How can we ensure our communication is characterized by clear and polite language in order to maintain a positive and professional interaction with our customers?
      04. How can we strategically implement automated email campaigns for above brand?
      05. When should the initiate review requests for above brand?
      06. How can we strategically incorporate branding elements to enhance the identity and recognition of above brand?
      07. How can we establish clear and effective review guidelines for above brand?
      08. How do you monitor and analyze customer sentiment for above brand?
      09. What are the strategies for Respond to Customer Reviews for above brand or industry?
      10. How does the brand effectively address and manage negative feedback to maintain a positive image and enhance customer satisfaction for above brand?
      11. How can we effectively utilize the Early Reviewer Program to enhance and promote above brand?
      12. How can we incentivize Reviews Legally for above brand?
      13. How does we effectively monitor and respond to questions related to the above brand?
      14. How can we effectively leverage customer feedback to enhance and strengthen for above brand?
      15. How can we track and analyze review metrics for the above brand?
      16. How can we ensure and maintain compliance with relevant policies for brand or industry?
      Please provide the answer for these  questions indidually less than 60 words`;
      this.globalObject.generateText(stringAllongWithQuestion).subscribe((result: any) => {
        this.spinner.show();
        this.message = result.choices[0].message.content;
        let brandQuestions = this.message.replace(/^\d+\.\s/gm, '').split('\n').filter((question:any) => question.trim().length > 0);
        this.reviewStrategies.forEach((question, index) => {
        question.input = brandQuestions[index];
         this.spinner.hide();
        });
      },(error:any)=>{
        this.spinner.hide()
              });
  }

  setCurrentStep(step: number): void {
    this.contentStep = step;
  }
  setCurrentStepfordesign(step: number): void{
    this.contentStepfordesign = step; 
  }
  copyTextToClipboard(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);  
  }
  onSubmit(){
    
  }
}
