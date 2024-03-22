import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OpenaiService } from 'src/app/core/service/data/openai.service';
import {
  apiResultFormat,
  DataService,
  pageSelection,
  routes,
} from 'src/app/core/core.index';
import { PaginationService, tablePageSize } from 'src/app/shared/shared.index';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ObjectDataService } from 'src/app/core/service/data/objectdata.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss'],
})
export class ProductlistComponent implements OnInit {
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
  formData: any = {};
  prompt: string = '';
  generatedText: any;
  message: any;
  currentStep = 1;
  totalSteps = 3;
  submitted = false;
  selectedSeats: number = 1;
  productformValue!: FormGroup;
  sectionTwo!: FormGroup;
  sectionThree!: FormGroup;
  industries: string[] = [
    'Apparel and Fashion',
    'Home and Kitchen',
    'Books and Publications',
    'Health and Beauty',
    'Toys and Games',
    'Automotive Parts and Accessories',
    'Sports and Outdoors',
    'Jewelry and Watches',
    'Grocery and Gourmet Food',
    'Pet Supplies',
    'Baby Products',
    'Tools and Home Improvement',
    'Office Products',
    'Furniture',
    'Industrial and Scientific',
    'Arts, Crafts, and Sewing',
    'Musical Instruments',
    'Handmade Crafts and Artisan Products',
    'Collectibles and Vintage Items'
];
  geography: string[] = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Netherlands',
    'Japan',
    'Australia',
    'India',
    'Brazil',
    'Mexico',
    'Middle East and North Africa (MENA)',
    'Southeast Asia',
    'China',
    'South Korea',
    'Singapore',
    'Turkey',
    'Sweden'
]
  language: string[] = ['Spanish', 'French', 'German', 'Italian', 'Dutch', 'Portuguese', 'Russian', 'Chinese (Simplified)', 'Japanese', 'Korean', 'Arabic'];
  selectedIndustry: string = '';
  selectedgeography: string = '';
  selectedLanguage:string = '';
  //** / pagination variables

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private sweetlalert: SweetalertService,
    private router: Router,
    private openaiService: OpenaiService,  private formBuilder: FormBuilder,
    private globalObject:ObjectDataService
  ) {
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
     
    });
    this.productformValue = this.formBuilder.group({
      passengerName: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],
      dob: [''],  
    });
    this.sectionTwo = this.formBuilder.group({      
      numberOfTickets: ['', [Validators.required, Validators.min(1)]],
       mealPreference: [''],
       ticketClass: [''],
    });
    this.sectionThree = this.formBuilder.group({      
     
     additionalComments: ['', Validators.required],
     attachment: [''],
    //  seats: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
     password: ['', Validators.required]
   });
  }
  get f() {
    return this.productformValue.controls;    
  }
  get s() {
    return this.sectionTwo.controls;
  }
 
  get t() {
    return this.sectionThree.controls;
  }
  generateText(string:any) {    
    this.openaiService.generateText(string).subscribe(
      (response:any) => {             
        this.generatedText =  response.choices[0].message.content;      
        this.message = response.choices[0].message.content;
        console.log(response.choices[0].message.content);
        console.log(response.choices[0].text);
 
      },
      (error:any) => {
        console.error('Error:', error);
      }
    );
  }
  exportToCsv() {  
    const dataForCsv = [{ message: this.message }];
    this.openaiService.downloadCsv(dataForCsv, 'exported-file');
  }
 
  nextStep() {
    this.submitted =true;
 
    if (this.currentStep === 1 && this.productformValue.valid) {
      this.currentStep++;
    } else if (this.currentStep === 2 && this.sectionTwo.valid) {
      this.currentStep++;
    } else if (this.currentStep === 3 && this.sectionThree.valid) {
      this.currentStep++;
    }
    //  if (this.currentStep < this.totalSteps) {
    //   this.currentStep++;
    // }
   
  }
 
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  ngOnInit(): void {}
  
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

onSubmit(): void {
  const newData = {
    'industry': this.selectedIndustry,
    'geography': this.selectedgeography,
    'OutputLanguage':this.selectedLanguage
  };
  this.globalObject.setData(newData);
}
}
