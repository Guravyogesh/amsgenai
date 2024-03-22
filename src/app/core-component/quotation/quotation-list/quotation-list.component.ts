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
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss'],
})
export class QuotationListComponent implements OnInit {
  contentStep=1;
  contentStepfordesign: number = 1;
  initChecked: boolean = false;
  public tableData: Array<any> = [];
  public routes = routes;
  // pagination variables
  public pageSize: number = 10;
  public serialNumberArray: Array<any> = [];
  public totalData: any = 0;
  showFilter: boolean = false;
  dataSource!: MatTableDataSource<any>;
  public searchDataValue = '';
  optimizationStrategies = [
    { label: 'Keyword Research', input: '' },
    { label: 'Long-Tail Keywords', input: '' },
    { label: 'Competitor Analysis', input: '' },
    { label: 'Utilize Backend Keywords', input: '' },
    { label: 'Strategic Placement in Titles', input: '' },
    { label: 'Optimize Product Descriptions', input: '' },
    { label: 'Enhanced Brand Content (EBC)', input: '' },
    { label: 'Utilize Bullet Points Effectively', input: '' },
    { label: 'Backend Search Term Optimization', input: '' },
    { label: 'Customer Reviews and Feedback', input: '' },
    { label: 'Regularly Update Listings', input: '' },
    { label: 'Utilize Amazon PPC Campaigns', input: '' },
    { label: 'Monitor and Adjust Strategies', input: '' },
    { label: 'Utilize Amazon A9 Algorithm Insights', input: '' },
    { label: 'Optimize Images with Alt Text', input: '' },
    { label: 'Participate in Amazon Programs', input: '' },
    { label: 'Strategic Use of Promotions', input: '' }
  ];
  //** / pagination variables
  newLine: any =`\n`;
OutputData: any;
message: any;
  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private sweetalert: SweetalertService,
    private router: Router,
    private globalObject:ObjectDataService,
    private spinner: SpinnerService
  ) {
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
  ngOnInit(): void {
    this.OutputData = this.globalObject.getData();
      let stringified = JSON.stringify(this.OutputData);
      let stringAllongWithQuestion = `${stringified}${this.newLine} I am building an application taking the above input can you provide me answer for the below question in a balanced tone this information is for a new seller on Amazon e-market place, please moderate the answer for ${this.OutputData.geography} in ${this.OutputData.OutputLanguage}${this.newLine}
      01. How can we conduct effective keyword research to optimize SEO for above brand?
      02. What are the strategies we implemented to effectively incorporate long-tail keywords into the SEO strategy for the above brand or industry?
      03. How can we conduct a thorough and effective competitor analysis to enhance the strategy for above brand or industry?
      04. How can we effectively leverage backend keywords to optimize for above brand or industry?
      05. How can we strategically optimize the placement of keywords in titles to enhance the performance for above brand or industry?
      06. How can we optimize product descriptions to enhance the performance for above brand?
      07. How can Enhanced Brand Content (EBC) benefit for above brand or industry's SEO strategy?
      08. How can we effectively utilize bullet points for clear and concise communication for the above brand or industry?
      09. How can we optimize backend search terms effectively for above brand or industry?
      10. How can we optimize and manage customer reviews and feedback to enhance above brand's reputation and customer satisfaction in the industry?
      11. How can we ensure timely updates and Strategies for the above brand or industry listings?
      12. How can we effectively leverage Amazon PPC campaigns to promote above brand or industry?
      13. How do you monitor and adjust strategies for the above brand or industry?
      14. How can we strategically leverage insights from the Amazon A9 algorithm to optimize above brand's visibility and performance on the platform?
      15. How can we optimize images with alt text effectively for the above brand or industry?
      16. How can above brand effectively participate in Amazon programs to enhance visibility and success for above industry?
      17. How can the above brand or industry strategically leverage promotions to enhance market presence and drive sales?
      Please provide the answer for these questions indidually less than 20 keywords`;
      this.globalObject.generateText(stringAllongWithQuestion).subscribe((result: any) => {
        this.spinner.show();
        this.message = result.choices[0].message.content;
        let brandQuestions = this.message.replace(/^\d+\.\s/gm, '').split('\n').filter((question:any) => question.trim().length > 0);
        this.optimizationStrategies.forEach((question, index) => {
        question.input = brandQuestions[index];
         this.spinner.hide();
        });
      },(error:any)=>{
        this.spinner.hide()
              });
  }

}
