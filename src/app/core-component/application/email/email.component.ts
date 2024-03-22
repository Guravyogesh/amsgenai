import { Component, OnInit } from '@angular/core';
import { OpenaiService } from 'src/app/core/service/data/openai.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})

export class EmailComponent implements OnInit {
  Textcontent:string=''
  message: any;
  constructor(private openaiService: OpenaiService) { }

  ngOnInit(): void {
  }

  onSubmit(){
this.openaiService.generateText(this.Textcontent).subscribe(res=>{
  this.message = res.choices[0].message.content;
})
  }
}
