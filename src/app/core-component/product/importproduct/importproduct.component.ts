import { Component, OnInit } from '@angular/core';
import {
  apiResultFormat,
  DataService,
  pageSelection,
  routes,
  SpinnerService,
} from 'src/app/core/core.index';
import { ObjectDataService } from 'src/app/core/service/data/objectdata.service';
@Component({
  selector: 'app-importproduct',
  templateUrl: './importproduct.component.html',
  styleUrls: ['./importproduct.component.scss']
})
export class ImportproductComponent implements OnInit {
  public routes = routes;
  contentStep=1;
  contentStepfordesign: number = 1;
  newLine: any =`\n`;
  marketingStrategies = [
    { label: 'Amazon PPC (Pay-Per-Click)', input: '' },
    { label: 'Optimized Product Listings', input: '' },
    { label: 'Amazon Coupons and Discounts', input: '' },
    { label: 'Amazon Lightning Deals', input: '' },
    { label: 'Social Media Promotion', input: '' },
    { label: 'Email Marketing', input: '' },
    { label: 'Influencer Collaborations', input: '' },
    { label: 'Amazon A9 Algorithm Optimization', input: '' },
    { label: 'Amazon Vine Program', input: '' },
    { label: 'Cross-Promotions and Bundling', input: '' }
  ];
  OutputData: any;
  message: any;
  constructor(private globalObject:ObjectDataService,private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.OutputData = this.globalObject.getData();
      let stringified = JSON.stringify(this.OutputData);
      let stringAllongWithQuestion = `${stringified}${this.newLine} I am building an application taking the above input can you provide me answer for the below question in a balanced tone this information is for a new seller on Amazon e-market place, please moderate the answer for ${this.OutputData.geography} in ${this.OutputData.OutputLanguage}${this.newLine}
      01. How can we effectively use Amazon PPC (Pay-Per-Click) above brand?
      02. How can we Optimize Product Listings for above brand?
03. How can we use Amazon Coupons and Discounts for above brand?
04. How can we use Amazon Lightning Deals for above brand?
05. How can we promote the above brand in Social Media?
06. What is the best Email Marketing can be used for above brand?
07. How can we use Influencer Collaborations for above brand?
08. What should be the best Amazon A9 Algorithm Optimization for above brand?
09. What should be the best Amazon Vine Program for above brand?
10. How can we use Cross-Promotions and Bundling for above brand?
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
  onSubmit() {};
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
}
