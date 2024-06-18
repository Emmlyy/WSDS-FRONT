import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {interval, Observable} from 'rxjs';
import {INews, ISavedNews, ISheet, ISheetModal} from "../interfaces/news.interface";
import {IPrompts} from "../interfaces/indicators.interface";
import {formatDate} from "../utils/utils";
import {LoaderService} from "./loader.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})



export class GemmaService {
  private apiUrl = 'http://127.0.0.1:8000';
  // http://127.0.0.1:8000/global
  //http://localhost:3000
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  searchData(search: string, date_start: string, date_end: string, performance: string,number_search: number, start_from: number): Observable<any> {
    /*
  currentMessage$ =
  );*/
    this.loaderService.setMessage("Buscando noticias...")
    const params = new HttpParams()
      .set('search', search)
      .set('date_start', formatDate(date_start))
      .set('date_end', formatDate(date_end))
      .set('gemma_mode', performance).set('start_from', start_from).set('number_search', number_search);

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

  updateSheet(sheet: ISheet): Observable<{ status: string, id: string }> {
    const params = new HttpParams()
      .set('sheet_id', sheet.id)
    return this.http.put<{ status: string, id: string }>(`${this.apiUrl}/sheets/`, sheet, {params});
  }

  createSheet(sheet: ISheet): Observable<{ status: string, id: string }> {
    const params = new HttpParams()
      .set('sheet_id', sheet.id)
    return this.http.post<{ status: string, id: string }>(`${this.apiUrl}/sheets/`, sheet);
  }

  getAllNews(): Observable<ISavedNews[]> {
    this.loaderService.setMessage("Buscando en la base de datos...")
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
  generateSheet(new_ : INews): Observable<{ indicator_name: string, response: string }[]> {
    return this.http.post<{ indicator_name: string, response: string }[]>(`${this.apiUrl}/generate_sheet/`, new_);
  }

  getTotalResults(search: string, date_start: string, date_end: string, performance: string, number_search: number, start_from: number): Observable<number> {
    const params = new HttpParams()
      .set('search', search)
      .set('date_start', formatDate(date_start))
      .set('date_end', formatDate(date_end))
      .set('gemma_mode', performance).set('start_from', start_from).set('number_search', number_search);
    return this.http.get<number>(`${this.apiUrl}/total_results/`, {params});
  }
}

