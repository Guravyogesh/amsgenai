import { Component } from '@angular/core';
declare var $: any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectDataService } from 'src/app/core/service/data/objectdata.service';
import { OpenaiService } from 'src/app/core/service/data/openai.service';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PptxGenJS from 'pptxgenjs'
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {


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
  language: string[] = ['English', 'Spanish', 'French', 'German', 'Italian', 'Dutch', 'Portuguese', 'Russian', 'Chinese (Simplified)', 'Japanese', 'Korean', 'Arabic'];
  selectedIndustry: string = '';
  selectedgeography: string = '';
  selectedLanguage: string = '';
  Pages = ['5', '15', '20',];
  wordAmounts = ['Bullets', 'Brief', 'Regular', 'Detailed'];
  responce: any;
  showImages = false;
  showVideo = false;
  showGeneratedImages = false;
  popForm: FormGroup;
  Output: any;
  links: any;
  wikipediaLink: any;
  mediumLink: any;
  googleLink: any;
  wikipediaLable: any;
  mediumLable: any;
  googleLable: any;
  generatedImage: any;
  options: any;
  processedOptions: any;
  points: any;
  pptContent: any;
  constructor(private fb: FormBuilder, private service: ObjectDataService, private openaiservice: OpenaiService) {
    this.popForm = this.fb.group({
      selectedIndustry: ['', Validators.required],
      geography: ['', Validators.required],
      selectedLanguage: ['', Validators.required],
      page: ['', Validators.required],
      wordAmounts: ['', Validators.required],
      prompt1: ['', Validators.required],
      prompt2: ['', Validators.required],
      prompt3: ['', Validators.required],
      prompt4: ['', Validators.required],
      // Add other form controls
    });
  }

  ngOnInit(): void { }
  onSubmit(): void {
    if (this.popForm.valid) {
      let inputfromuser = `Below info. for a startup on e-marketplace namely Amazon whose Industry is ${this.popForm.value.selectedIndustry} resides in the geography: ${this.popForm.value.geography} and output should be in ${this.popForm.value.selectedLanguage}
 
      Based on the ${this.popForm.value.prompt1} origin story provided can you share 2 options.
      based on the inputs of Brand Values as ${this.popForm.value.prompt2}  can you elaborate further and share 2 options
      based on the inputs of the Evolution & Growthas ${this.popForm.value.prompt3} over the period of 3 years, can you share a strategy with two options
      Based on the ${this.popForm.value.prompt4} Differentiation provided can you share 2 options.    
       
      The output should be ${this.popForm.value.wordAmounts} with ${this.popForm.value.page} also share  Wikipedia, Medium and google similar link `
      let inputfordalle = `Provide the image for  Below info. for a startup on e-marketplace namely Amazon whose Industry is ${this.popForm.value.selectedIndustry} resides in the geography: ${this.popForm.value.geography} 
 
      Based on the ${this.popForm.value.prompt1} origin story provided and.
      based on the inputs of Brand Values as ${this.popForm.value.prompt2} and ${this.popForm.value.prompt4}`
      this.service.generateText(inputfromuser).subscribe(response => {
        this.Output = response.choices[0].message.content;
        this.options = this.Output.split('- ');

        this.processedOptions = this.options.map((option: string) => {
          const points = option.trim().split('\n').map(point => point.trim());
          return { points };
        });
        const urlRegex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
        const matches = [...this.Output.matchAll(urlRegex)];
        const extractedLinks = matches.map(([_, label, url]) => ({ label, url }));
        this.links = extractedLinks;
        this.wikipediaLink = this.links[0]?.url;
        this.wikipediaLable = this.links[0]?.label;
        this.mediumLink = this.links[1]?.url;
        this.mediumLable = this.links[1]?.label;
        this.googleLink = this.links[2]?.url;
        this.googleLable = this.links[2]?.label;

        this.openaiservice.generateGenAiImage(inputfordalle).subscribe(response => {
          this.generatedImage = response.data;
          setTimeout(() => {
            $('#exampleModalToggle2').modal('show');
            //$('#exampleModalToggleAmazon').modal('hide');
          }, 1000);
        })
      });
    }

  }
  // Method to show the modal
  showModal(data: any): void {
    this.responce = data
    $('#exampleModalToggleAmazon').modal('show');
  }

  // Method to hide the modal
  hideModal(): void {
    $('#exampleModalToggleAmazon').modal('hide');
    this.popForm.reset();
  }

  toggleContent(contentType: string) {
    switch (contentType) {
      case 'images':
        this.showImages = !this.showImages;
        break;
      case 'video':
        this.showVideo = !this.showVideo;
        break;
      case 'generatedImages':
        this.showGeneratedImages = !this.showGeneratedImages;
        break;
      // Add more cases if needed for other content types
      default:
        break;
    }
  }
  // download csv file
  exportToCsv() {
    debugger
    const dataForCsv = [{ message: this.options }];
    this.openaiservice.downloadCsv(dataForCsv, 'exported-file');
  }
  // download pdf file
  downloadPdf(): void {
    let DATA: any = document.getElementById('printTable');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('openAi.pdf');
    });
  }
  downloadPpt(): void {
    const pptx = new PptxGenJS();
    const slides = this.options;

    slides.forEach((slideContent: string, index: number) => {
      const lines = slideContent.split('\n');
      const slide = pptx.addSlide();

      slide.background = { color: "#e9ecef" };

      // Add logo (replace 'path/to/logo.png' with the actual path)
      const logoOpts = { x: 8.5, y: 0.5, w: 1, h: 0.75 };

      slide.addImage({ path: '../assets/img/Hexaware.png', ...logoOpts });


      // Add title with larger font size
      slide.addText(`${lines[0]}`, { x: 1, y: 0.5, w: 5, h: 1, fontSize: 14, bold: true });

      // Add bullet points or additional content with a smaller font size
      for (let i = 1; i < lines.length; i++) {

        slide.addText(`- ${lines[i]}`, { x: 1, y: 1.5 + (i - 1) * 0.5, w: 5, h: 0.5, fontSize: 12, lineSpacing: 0.2 });
      }
      // Add footer
      const footerText = '© 2024 Hexa OpenAi. All Rights Reserved.';
      slide.addText(footerText, { x: 0.5, y: 5, w: '100%', h: 0.5, align: 'center', fontFace: 'Arial', fontSize: 12, color: '888888', bold: true });

    });

    pptx.writeFile({ fileName: 'Generated_Presentation' });
  }
  //   slide(){
  //     const pptx = new PptxGenJS();
  // const slides = this.options;
  // const desiredIndex = 0;
  // // Function to add title and options to a slide
  // function addTitleAndOptions(slide: PptxGenJS.Slide, title: string, options: any[]) {
  //   slide.background = { color: "#e9ecef" };

  //   // Add logo (replace 'path/to/logo.png' with the actual path)
  //   const logoOpts = { x: 8.5, y: 0.5, w: 1, h: 0.75 };
  //   slide.addImage({ path: '../assets/img/Hexaware.png', ...logoOpts });

  //   // Add title with larger font size
  //   slide.addText(title, { x: 1, y: 0.5, w: 5, h: 1, fontSize: 14, bold: true });

  //   // Add options with a smaller font size
  //   options.forEach((option, index) => {
  //     slide.addText(`- ${option}`, { x: 1, y: 1.5 + index * 0.5, w: 5, h: 0.5, fontSize: 12, lineSpacing: 0.2 });
  //   });

  //   // Add footer
  //   const footerText = '© 2024 Hexa OpenAi. All Rights Reserved.';
  //   slide.addText(footerText, { x: 0.5, y: 5, w: '100%', h: 0.5, align: 'center', fontFace: 'Arial', fontSize: 12, color: '888888', bold: true });
  // }

  // slides.forEach((slideContent: string, index: number) => {
  //   const lines = slideContent.split('\n');
  //   const slide = pptx.addSlide();

  //   // Check if the current slide is one where you want to add title and options
  //   if (index === desiredIndex) {
  //     const title = lines[0];
  //     const options = lines.slice(1);
  //     addTitleAndOptions(slide, title, options);
  //   } else {
  //     // For other slides, continue with your existing logic
  //     slide.background = { color: "#e9ecef" };
  //     // ... (rest of your code for regular slides)
  //   }
  // });

  // pptx.writeFile({ fileName: 'Generated_Presentation' });
  //   }

}
