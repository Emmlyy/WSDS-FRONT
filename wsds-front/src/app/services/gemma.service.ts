import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {INews, ISavedNews, ISheet} from "../interfaces/news.interface";
import {IPrompts} from "../interfaces/indicators.interface";

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
  getFilteredNews(search_word: string = "", filters_sheet: ISheet | null = null, date_start: string = "", date_end: string = ""): Observable<ISavedNews[]> {
    const params = new HttpParams()
      .set('search_word', search_word)
      .set('date_start', formatDate(date_start))
      .set('date_end', formatDate(date_end))

    return this.http.post<ISavedNews[]>(`${this.apiUrl}/news-sheet-filter/`, filters_sheet, {params, });
  }
  getIndicators(type: string = ""): Observable<IPrompts[]> {
    return this.http.get<IPrompts[]>(`${this.apiUrl}/prompts/`);
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
