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
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {
  public routes = routes;
  contentStep=1;
  contentStepfordesign: number = 1;
  newLine: any =`\n`;
  customerServicePoints = [
    { label: 'Timely Response', input: '' },
    { label: 'Clear and Concise Communication', input: '' },
    { label: 'Utilize Amazon Messaging System', input: '' },
    { label: 'Customer-Focused Language', input: '' },
    { label: 'Resolution Offering', input: '' },
    { label: 'Product Information and Policies', input: '' },
    { label: 'Returns and Refunds Process', input: '' },
    { label: 'Handle Negative Feedback Professionally', input: '' },
    { label: 'Use Templates Wisely', input: '' },
    { label: 'Escalate Issues When Necessary', input: '' },
    { label: 'Monitor Customer Metrics', input: '' },
    { label: 'Provide Tracking Information', input: '' },
    { label: 'Continuous Improvement', input: '' },
    { label: 'Stay Informed About Policies', input: '' },
  ];
  OutputData: any;
  message: any;
  brandQuestions: any;

  constructor( private globalObject:ObjectDataService, private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.OutputData = this.globalObject.getData();
      let stringified = JSON.stringify(this.OutputData);
      let stringAllongWithQuestion = `${stringified}${this.newLine} I am building an application taking the above input can you provide me answer for the below question in a balanced tone this information is for a new seller on Amazon e-market place, please moderate the answer for ${this.OutputData.geography} in ${this.OutputData.OutputLanguage}${this.newLine}
      1. What should be Timely Response for the brand-values?
      2. What should be Clear and Concise Communication for Differentiation for the brand personality?
      3. How should we Utilize Amazon Messaging System for the above industry?
      4. What should be Customer-Focused Language using OutputLanguage define?
      5. What should be Resolution Offering for the above industry?
      6. What is the Product related Information and Policies for the above industry?
      7. How should the Returns and Refunds Process for the above industry?
      8. How should we Handle Negative Feedback Professionally?
      9. How should Use Templates Wisely for the above brand?
      10. How should we Escalate Issues When Necessary for the above brand based on industry guidelines?
      11. How should we manage and Monitor Customer Metrics in Amazon?
      12. How should we Provide Tracking Information for an end customer using Amazon?
      13. What are the best practices for Continuous Improvement for the above brand mapping the above Industry?
      14. What are the best practices for Stay Informed About Policies for the above brand mapping the above Industry?
      Please provide the answer for these questions indidually less than 60 words`;
      this.globalObject.generateText(stringAllongWithQuestion).subscribe((result: any) => {
        this.spinner.show();
        this.message = result.choices[0].message.content;
        this.brandQuestions = this.message.replace(/^\d+\.\s/gm, '').split('\n').filter((question:any) => question.trim().length > 0);
        this.customerServicePoints.forEach((question, index) => {
        question.input = this.brandQuestions[index];
         this.spinner.hide();
        });
      },(error:any)=>{
this.spinner.hide()
      });
  }

onSubmit() {}
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
