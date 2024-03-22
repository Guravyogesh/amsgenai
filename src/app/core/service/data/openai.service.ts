// import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiKey = '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';
  // private apiKey = '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';

  private apiUrlh = 'https://api.openai.com/v1/engines/davinci/completions'; 
  private apiUrl ='https://api.openai.com/v1/chat/completions';
 
  constructor(private http: HttpClient) {}
 
  generateText(prompt: string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };
 
    // const data = {
    //   prompt,
    //   model: 'text-davinci-002',
    //   max_tokens: 100,
    // };
    const data = {
      model: 'gpt-3.5-turbo', // Adjust the model name as needed
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

  generateGenAiImage(prompt: string): Observable<any> {
    const url = `https://api.openai.com/v1/images/generations`;
    const body = { model: 'dall-e-2', prompt,
    n:2,
    size: "1024x1024" };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    });
   
    return this.http.post(url, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error in API request:', error);
        throw error; // Re-throw the error to propagate it to the component
      })
    );
  }

  downloadImage(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }
}
