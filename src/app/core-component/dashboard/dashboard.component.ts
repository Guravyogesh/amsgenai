import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexResponsive,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';
import { SmoothScroll } from 'ngx-scrollbar/smooth-scroll';
import { CommonService } from 'src/app/core/core.index';
import { ObjectDataService } from 'src/app/core/service/data/objectdata.service';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive | any;
  colors: any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  legend: ApexLegend | any;
  fill: ApexFill | any;
};
import { routes } from 'src/app/core/helpers/routes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public routes = routes;

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public currency!: string;
  currentStep = 1;
  totalSteps = 4;
  heading: any;
  jsonData: any;
  sections: any;
  displayStyle: string;
  
  constructor(private common: CommonService, viewRef: ViewContainerRef, private dataService:ObjectDataService) {
 
  }

  ngOnInit(): void {    
    this.getJsonDetails();
  }

  getJsonDetails(){  
    this.dataService.getJsonData().subscribe(data => {  
      this.jsonData = data;
      this.sections = data.sections.content[0].data;
    });
  }
  
  openPopup() {
    this.displayStyle = "block";
  }
  openPopuph() {
    this.displayStyle
  }
  closePopup() {
    this.displayStyle = "none";
  }
  closePopuph() {
    this.displayStyle = "none";
  }
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    if (step >= 1 && step <= this.totalSteps) {
      this.currentStep = step;
    }
  }
  toCareer(data:any) {
    this.heading = data
    //document.getElementById("career")?.scrollIntoView({ behavior: 'smooth' });
    const element = document.getElementById(data);
    if (element) {
      const offset = 90; // Adjust this value as needed
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
 
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
