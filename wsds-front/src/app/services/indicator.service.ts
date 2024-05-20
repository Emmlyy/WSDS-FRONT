import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IIndicatorEntry} from "../interfaces/indicators.interface";

@Injectable({
  providedIn: 'root',
})
export class IndicatorService {
  private apiUrl = 'http://localhost:8000';
  // localhost:8000/prompts/

  constructor(private http: HttpClient) {}
  searchAllPromptData(): Observable<any> {
    const urlWithQuery = `${this.apiUrl}/prompts`;
    return this.http.get(urlWithQuery);
  }
  getAllPromptEntryData(): Observable<any> {
    const urlWithQuery = `${this.apiUrl}/promptsEntry`;
    return this.http.get(urlWithQuery);
  }
  createIndicator(indicator: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}/prompts/`, indicator, { headers });
  }
  getPrompt(prompt_id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/prompts/${prompt_id}`);
  }
  updateEntry(entryId: string, entry: IIndicatorEntry): Observable<{ message: string }> {
    const urlWithQuery = `${this.apiUrl}/promptsEntry/${entryId}`;
    return this.http.put<{ message: string }>(urlWithQuery, entry);
  }
  createEntry(entry: IIndicatorEntry): Observable<{ message: string }> {
    const urlWithQuery = `${this.apiUrl}/promptsEntry/`;
    return this.http.post<{ message: string }>(urlWithQuery, entry);
  }
  deleteEntry(entryId: string): Observable<{ message: string }> {
    const urlWithQuery = `${this.apiUrl}/promptsEntry/${entryId}`;
    return this.http.delete<{ message: string }>(urlWithQuery);
  }
  getCurrentSetting(): Observable<{ value: string }> {
    const urlWithQuery = `${this.apiUrl}/global_id/`;
    return this.http.get<{ value: string }>(urlWithQuery);
  }
  updateSetting(id: string): Observable<{ message: string }> {
    const urlWithQuery = `${this.apiUrl}/update_global/${id}`;
    return this.http.put<{ message: string }>(urlWithQuery, {});
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
