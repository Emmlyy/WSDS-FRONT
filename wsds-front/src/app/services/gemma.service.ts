import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GemmaService {
  private apiUrl = 'http://127.0.0.1:8000';
  // http://127.0.0.1:8000/global
  //http://localhost:3000
  constructor(private http: HttpClient) { }
  searchData(parameter: string): Observable<any> {
    const urlWithQuery = `${this.apiUrl}/model_gemma?search=${parameter}`;
    return this.http.get(urlWithQuery,  {
      observe: 'events',
      responseType: 'text',
      reportProgress: true
    });
  }
}
