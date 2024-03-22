import { Component, OnInit } from '@angular/core';
import {
  apiResultFormat,
  DataService,
  pageSelection,
  routes,
} from 'src/app/core/core.index';
@Component({
  selector: 'app-importpurchase',
  templateUrl: './importpurchase.component.html',
  styleUrls: ['./importpurchase.component.scss']
})
export class ImportpurchaseComponent implements OnInit {
  contentStep=1;
  contentStepfordesign: number = 1;
  public routes = routes;
  optimizationStrategies = [
    { label: 'Keyword Research', input: '' },
    { label: 'Strategic Keyword Placement', input: '' },
    { label: 'Optimized Product Title', input: '' },
    { label: 'Detailed and Informative Description', input: '' },
    { label: 'Utilize Bullet Points Effectively', input: '' },
    { label: 'Enhanced Brand Content (EBC)', input: '' },
    { label: 'Clear and High-Quality Images', input: '' },
    { label: 'Include Alt Text for Images', input: '' },
    { label: 'Competitive Pricing Strategy', input: '' },
    { label: 'Utilize Amazon A9 Algorithm Insights', input: '' },
    { label: 'Encourage Customer Reviews', input: '' },
    { label: 'Strategic Use of Promotions', input: '' },
    { label: 'Optimized Backend Search Terms', input: '' },
    { label: 'Regular Listing Updates', input: '' },
    { label: 'Utilize Amazon PPC Campaigns', input: '' },
    { label: 'Cross-Promotions and Bundling', input: '' },
    { label: 'Participate in Amazon Programs', input: '' },
    { label: 'Monitor Competitor Strategies', input: '' },
    { label: 'Track and Analyze Performance Metrics', input: '' }
  ];

  constructor() { }

  ngOnInit(): void {
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
