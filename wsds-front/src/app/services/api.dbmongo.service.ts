import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  private apiUrl = 'http://localhost:8000';
  // localhost:8000/prompts/

  constructor(private http: HttpClient) {}
  searchAllPromptData(): Observable<any> {
    const urlWithQuery = `${this.apiUrl}/prompts`;
    /*const req = new HttpRequest('GET', this.apiUrl, {
      reportProgress: true
    });
    return this.http.request(req);*/
    return this.http.get(urlWithQuery, {
      observe: 'events',
      responseType: 'text',
      reportProgress: true,
    });
  }
  searchAllPromptEntryData(): Observable<any> {
    const urlWithQuery = `${this.apiUrl}/promptsEntry`;
    /*const req = new HttpRequest('GET', this.apiUrl, {
      reportProgress: true
    });
    return this.http.request(req);*/
    return this.http.get(urlWithQuery, {
      observe: 'events',
      responseType: 'text',
      reportProgress: true,
    });
  }


  createIndicator(indicator: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}/prompts/`, indicator, { headers });
  }

  getPrompt(prompt_id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/prompts/${prompt_id}`, {
      observe: 'events',
      responseType: 'text',
      reportProgress: true,
    });
  }

  updateEntry(entryId: string, entry: any): Observable<any> {
    const urlWithQuery = `${this.apiUrl}/promptsEntry`;

    return this.http.put<any>(`${urlWithQuery}/${entryId}`, entry);
  }


}




export interface Prompt {
  id?: string;
  indicator_name: string;
  prompt: string;
}

export interface PromptEntry {
  id: string;
  name: string;
  indicators: Prompt[];
}
