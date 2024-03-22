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
  selector: 'app-subcategorylist',
  templateUrl: './subcategorylist.component.html',
  styleUrls: ['./subcategorylist.component.scss'],
})
export class SubcategorylistComponent implements OnInit {
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
  Competitive : string = `Competitive Pricing:

  Premium Pricing:
 
  Dynamic Pricing:`;
  Loss: string = `Loss Leader Pricing:
  
  MAP Pricing (Minimum Advertised Price):`;
  Penetration : string = `Penetration Pricing:
  
  Bundle Pricing:`;
  ValueBased: string = `Value-Based Pricing:
  
  Psychological Pricing:`;
  Geographic : string = `Geographic Pricing:`;
  Additional: string = `Additional-Information:`;
  newLine: any =`\n`;
  OutputData: any;
  //** / pagination variables
  constructor(
    private globalObject:ObjectDataService
  ) {

  }


  ngOnInit(): void {
    this.OutputData =  this.globalObject.getData();
    }
    getObjectKeys(obj: any): string[] {
      return Object.keys(obj);
    } 
  onSubmit(){
    let gettingString = `${this.Competitive}${this.newLine}${this.Loss}${this.newLine}${this.Penetration}${this.newLine}${this.ValueBased}${this.newLine}${this.Geographic}${this.newLine}${this.Additional}`;
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
