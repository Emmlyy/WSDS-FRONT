import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {INews, ISavedNews} from "../interfaces/news.interface";

@Injectable({
  providedIn: 'root',
})



export class GemmaService {
  private apiUrl = 'http://127.0.0.1:8000';
  // http://127.0.0.1:8000/global
  //http://localhost:3000
  constructor(private http: HttpClient) {}

  searchData(search: string, date_start: string, date_end: string, performance: string): Observable<any> {
    const params = new HttpParams()
      .set('search', search)
      .set('date_start', formatDate(date_start))
      .set('date_end', formatDate(date_end))
      .set('gemma_mode', performance);

    const urlWithQuery = `${this.apiUrl}/model_gemma`;
    return this.http.get(urlWithQuery, {
      params,
      observe: 'events',
      responseType: 'text',
      reportProgress: true,
    });
  }

  postNews(newData: INews): Observable<any> {
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
  getAllNews(): Observable<ISavedNews[]> {
    return this.http.get<ISavedNews[]>(`${this.apiUrl}/news-sheet/`);
  }
}

const formatDate = (fecha: string) => {
  if (fecha === ""){
    return ""
  }
  const dateObj: Date = new Date(fecha);

  const year: number = dateObj.getFullYear();
  const month: number = dateObj.getMonth() + 1;
  const day: number = dateObj.getDate();
  const formattedDate: string = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return formattedDate;
}
