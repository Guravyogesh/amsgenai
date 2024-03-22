import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes';
import { OpenaiService } from 'src/app/core/service/data/openai.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {
  public routes = routes;
  prompt:string ='';
  generatedImage:any
 
  constructor(private openaiService: OpenaiService) { }

  ngOnInit(): void {
   
  }

 generateImage(): void {
    if (!this.prompt.trim()) {
      console.error('Prompt cannot be empty');
      return;
    }
 
    this.openaiService.generateGenAiImage(this.prompt).subscribe(
      (response:any) => {
        this.generatedImage = response.data; 

      },
      (error:any) => {
        console.error('Error generating image:', error);
      }
    );
  }

  downLoadImage(url:any){
    const imageUrl = url;
    this.openaiService.downloadImage(imageUrl).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded_image.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

}
