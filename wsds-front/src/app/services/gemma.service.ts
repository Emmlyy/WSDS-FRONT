import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {News} from "../interfaces/news.interface";

@Injectable({
  providedIn: 'root',
})



export class GemmaService {



  private apiUrl = 'http://127.0.0.1:8000';
  // http://127.0.0.1:8000/global
  //http://localhost:3000
  constructor(private http: HttpClient) {}
  searchData(parameter: string): Observable<any> {
    const urlWithQuery = `${this.apiUrl}/model_gemma?search=${parameter}`;
    return this.http.get(urlWithQuery, {
      observe: 'events',
      responseType: 'text',
      reportProgress: true,
    });
  }

  postNews(newData: News): Observable<any> {
    console.log('mob', newData);
    return this.http.post(`${this.apiUrl}/news/`, newData);
  }

  getNews(new_url: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/news/${new_url}`, {
      observe: 'events',
      responseType: 'text',
      reportProgress: true,
    });
  }
  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/news/`);
  }
}

