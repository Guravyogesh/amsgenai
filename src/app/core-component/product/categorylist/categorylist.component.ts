import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  apiResultFormat,
  DataService,
  pageSelection,
  routes,
} from 'src/app/core/core.index';
import { ObjectDataService } from 'src/app/core/service/data/objectdata.service';
import { PaginationService, tablePageSize } from 'src/app/shared/shared.index';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.scss'],
})
export class CategorylistComponent implements OnInit {
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
  contentStep=1;
  contentStepfordesign: number = 1;
  //** / pagination variables
  Demographics: string = `Demographics:
  
Occupation and Income:
  
Education:

Family Structure:

Geographic Location`;
Brand: string = `Brand Preferences:

Communication Preferences:

Buying Motivations:`;
Interests : string = `Interests and Hobbies:

Values and Beliefs:

Lifestyle:

Online Behavior:

Tech Adoption:`;
Challenges: string = `Challenges:`;
Pain : string = `Pain Points:`;
Additional: string = `Additional-Information:`;
newLine: any =`\n`;
  receivedData: string;
  OutputData: any;
  constructor(
    private sweetalert: SweetalertService,
    private globalObject:ObjectDataService
  ) {
   
  }

  deleteBtn() {
    this.sweetalert.deleteBtn();
  }

  ngOnInit(): void {
    this.OutputData =  this.globalObject.getData();
    }
    getObjectKeys(obj: any): string[] {
      return Object.keys(obj);
    } 
  onSubmit(){
    let gettingString = `${this.Demographics}${this.newLine}${this.Interests}${this.newLine}${this.Pain}${this.newLine}${this.Brand}${this.newLine}${this.Challenges}${this.newLine}${this.Additional}`;
    this.globalObject.convertToJSON(gettingString);
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
}
