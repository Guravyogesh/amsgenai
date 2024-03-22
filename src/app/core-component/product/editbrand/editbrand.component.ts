import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OpenaiService } from 'src/app/core/service/data/openai.service';

@Component({
  selector: 'app-editbrand',
  templateUrl: './editbrand.component.html',
  styleUrls: ['./editbrand.component.scss']
})
export class EditbrandComponent implements OnInit {
  Output:any;
  targetAudience = [
    { value: '1', name: 'Teenagers'},
    { value: '2', name: 'Young Adults' },
    { value: '3', name: 'Millennials' },
    { value: '4', name: 'GenX' },
    { value: '5', name: 'Baby Boomers' },
    { value: '6', name: 'Seniors' },
  ];
  toneandStyle= [
    { value: '1', name: 'Professional'},
    { value: '2', name: 'Friendly' },
    { value: '3', name: 'Informative' },
  ];
  contentFormat= [
    { value: '1', name: 'Blog Post'},
    { value: '2', name: 'Social Media Upate' },
    { value: '3', name: 'Press Release' },
  ];
  visualElements= [
    { value: '1', name: 'Yes'},
    { value: '2', name: 'No' },
   
  ];
  contentCreationForm: any;
  constructor(private fb: FormBuilder,private openaiService: OpenaiService) {
    
    this.contentCreationForm = this.fb.group({
      contentPurpose: ['', Validators.required],
      targetAudience: ['', Validators.required],
      keyMessage: ['', Validators.required],
      toneAndStyle: ['', Validators.required],
      contentFormat: ['', Validators.required],
      seoKeywords: [''],
      importantInformation: [''],
      visualElements: ['', Validators.required],
      callToAction: [''],
      referencesAndSources: [''],
      additionalNotes: [''],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.contentCreationForm.valid) {
    let stringifieddata=  JSON.stringify(this.contentCreationForm.value)
      const formData =`create ${stringifieddata}` ;
      console.log(formData);
      this.openaiService.generateText(formData).subscribe(
        (response:any) => {      
          this.Output = response.choices[0].message.content; 
        },
        (error:any) => {
          console.error('Error:', error);
        }
      );
    } else {

    }

  }
 

}
