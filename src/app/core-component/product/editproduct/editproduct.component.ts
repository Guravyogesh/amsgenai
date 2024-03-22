import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes';
import { OpenaiService } from 'src/app/core/service/data/openai.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {
  public routes = routes;
  inputUrl:string = '';
  Output:string = '';
  notes:string = '';

  constructor(private openaiService: OpenaiService) { }

  ngOnInit(): void {
    
  }
  onSubmit(){
    let concatedString = `I am working on an SEO Audit for the following pages:${this.inputUrl} , can you recommend me the Primary Keywords, Secondary Keywords, Title, Description, Image alt text, canonical tag, hreflang and ${this.notes} `
    this.openaiService.generateText(concatedString).subscribe(
      (response:any) => {      
        this.Output = response.choices[0].message.content; 
      },
      (error:any) => {
        console.error('Error:', error);
      }
    );
  }

  exportCSV(){
    const dataForCsv = [{ message: this.Output }];
    this.openaiService.downloadCsv(dataForCsv, 'exported-file')
  }
}
