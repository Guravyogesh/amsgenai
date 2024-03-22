import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObjectDataService {
  private jsonUrl = 'assets/JSON/pos3.json';
 

  currentData: any = {};
  private apiKey = '';  
  private apiUrl ='https://api.openai.com/v1/chat/completions';
  private dataSubject = new BehaviorSubject<string>('');
  public data$: Observable<string> = this.dataSubject.asObservable();

  updateData(newData: string): void {
    this.dataSubject.next(newData);
  }

  constructor(private http: HttpClient) { }

  getJsonData(): Observable<any> {    
    return this.http.get<any>(this.jsonUrl);
  }
  setData(datavalue: any):any {
    if (this.currentData) {
      this.currentData = { ...this.currentData, ...datavalue }
    }
    else {
      this.currentData = datavalue
    }
    return this.currentData;
  }
  getData(): void {
    // this.currentData = {
    //   "Adaptability": "Compatibility with various accessories and add-ons.",
    //   "Additional-Information": "Rigorous quality control measures during manufacturing.",
    //   "Brand Preferences": "Limited edition collaborations with sought-after brands.",
    //   "Brand Story and Heritage": "Origin story highlighting founder's vision and values.",
    //   "Brand-personality": "young and gen-z",
    //   "Brand-values": "Honda",
    //   "Bundle Pricing": "Offering bundled packages at a discounted rate compared to individual purchases.",
    //   "Buying Motivations": "Emphasizing product benefits and features that address consumer needs.",
    //   "Challenges": "Anticipating potential obstacles in product development or distribution.",
    //   "Communication Preferences": "Responsive customer service team available via social media platforms.",
    //   "Competitive Pricing": "Conducting market research to benchmark pricing against competitors.",
    //   "Customer Benefits": "Improved productivity or efficiency.",
    //   "Customer Feedback and Reviews": "Positive testimonials from satisfied customers.",
    //   "Customer-testimonials": "best automotive brand in the world",
    //   "Customization Options": "Personalization tools to tailor products to individual preferences.",
    //   "Demographics": "Targeting specific age groups such as millennials or baby boomers.",
    //   "Design and Aesthetics": "Elegant and timeless design that appeals to various tastes.",
    //   "Differentiation": "ev and ice",
    //   "Dynamic Pricing": "Leveraging data analytics to adjust prices based on demand and supply.",
    //   "Education": "Providing educational resources or tutorials for novice users.",
    //   "Evolution-and-growth": "top automotive brand",
    //   "Family Structure": "Family-friendly features for households with children.",
    //   "Functionality": "Multi-functional features to serve multiple purposes.",
    //   "Future-vision": "Hydrogen",
    //   "Geographic Location": "Regional variations in product design or features.",
    //   "Geographic Pricing": "Adjusting prices based on regional variations in demand and cost of living.",
    //   "Interests and Hobbies": "Specialized products catering to niche hobbies or interests.",
    //   "Lifestyle": "Products designed for active lifestyles or outdoor enthusiasts.",
    //   "Loss Leader Pricing": "Pricing certain products below cost to attract customers to the store.",
    //   "MAP Pricing (Minimum Advertised Price)": "Establishing agreements with retailers to maintain consistent pricing across channels.",
    //   "Market Gap": "Identifying underserved niche markets or demographics.",
    //   "Occupation and Income": "Premium options for high-income professionals.",
    //   "Online Behavior": "Responsive website design for seamless browsing on all devices.",
    //   "Origin-story": "1945",
    //   "OutputLanguage": "Hindi",
    //   "Pain Points": "Addressing common frustrations or pain points experienced by consumers.",
    //   "Penetration Pricing": "Introducing products at a lower price point to gain market share quickly.",
    //   "Premium Pricing": "Positioning products as high-end luxury items with superior quality.",
    //   "Presentation and Packaging": "Premium packaging with attention to detail.",
    //   "Psychological Pricing": "Setting prices just below round numbers to create the perception of a discount.",
    //   "Quality and Durability": "Rigorous quality control measures during manufacturing.",
    //   "Strategic Collaborations": "Partnerships with well-known brands or influencers.",
    //   "Sustainability": "Use of recycled materials in product manufacturing.",
    //   "Target-audience-connection": "Across ages",
    //   "Tech Adoption": "Educational content to facilitate understanding of new technologies.",
    //   "Technology or Materials": "Cutting-edge technology for enhanced performance.",
    //   "Unique Selling Points (USPs)": "Patented technology exclusive to the brand.",
    //   "Value for Money": "Competitive pricing compared to similar products on the market.",
    //   "Value-Based Pricing": "Communicating the value proposition of products to justify pricing.",
    //   "Values and Beliefs": "Aligning with environmental or social causes through corporate responsibility initiatives.",
    //   "Visual-and-verbal-elements": "colourful",
    //   "geography": "Germany",
    //   "industry": "Health and Beauty"
    // }
    return this.currentData;
  }

  async convertToJSON(input: string): Promise<void> {
    const keyValuePairs = input
      .trim() // Remove leading/trailing whitespace
      .split('\n') // Split the string into lines
      .map((line) => line.split(':').map((item) => item.trim())) // Split each line into key-value pairs
      .filter(([key, value]) => key && value); // Filter out lines without both key and value

    const jsonObject: { [key: string]: string } = {};

    keyValuePairs.forEach(([key, value]) => {
      jsonObject[key] = value;
    });
    let currentData = await this.setData(jsonObject);
    return currentData;
  }

  generateText(prompt: string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    };

    return this.http.post<any>(this.apiUrl, data, { headers });
    
  }

  downloadCsv(data: any[], filename: string): void {
    const csvContent = this.convertArrayToCsv(data);

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename + '.csv';
    link.click();

    window.URL.revokeObjectURL(url);
  }

  private convertArrayToCsv(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(','));

    return header + '\n' + rows.join('\n');
  }
}
