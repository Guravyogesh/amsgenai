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
import { PaginationService, tablePageSize } from 'src/app/shared/shared.index';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';

@Component({
  selector: 'app-purchaselist',
  templateUrl: './purchaselist.component.html',
  styleUrls: ['./purchaselist.component.scss'],
})
export class PurchaselistComponent implements OnInit {
  initChecked: boolean = false;
  date = new Date();
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
  expansionStrategies = [
    { label: 'Product Line Expansion', input: '' },
    { label: 'Diversification Strategy', input: '' },
    { label: 'Market Research for New Products', input: '' },
    { label: 'Product Development and Quality', input: '' },
    { label: 'Brand Cohesiveness', input: '' },
    { label: 'Customer Feedback and Testing', input: '' },
    { label: 'Logistics and Supply Chain Management', input: '' },
    { label: 'Cost and Pricing Strategy', input: '' },
    { label: 'Marketplace Research for Expansion', input: '' },
    { label: 'Compliance with Local Regulations', input: '' },
    { label: 'Logistical Challenges of Expansion', input: '' },
    { label: 'Localized Marketing Strategies', input: '' },
    { label: 'Currency and Pricing Considerations', input: '' },
    { label: 'Customer Service for New Markets', input: '' },
    { label: 'Performance Monitoring and Adaptation', input: '' },
  ];
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
  //** / pagination variables
  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private sweetalert: SweetalertService,
    private router: Router
  ) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url == this.routes.purchaseList) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }
  deleteBtn() {
    this.sweetalert.deleteBtn();
  }
  private getTableData(pageOption: pageSelection): void {
    this.data.getPurchaseList().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: any, index: number) => {
        let serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<any>(this.tableData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.tableData = this.dataSource.filteredData;
  }
  public sortData(sort: Sort) {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  ngOnInit(): void {}
  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f: any) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f: any) => {
        f.isSelected = false;
      });
    }
  }
}
