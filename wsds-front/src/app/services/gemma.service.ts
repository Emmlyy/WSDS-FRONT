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

  searchData(query: string): Observable<any> {
    // const params = new HttpParams().set('/', query);
    // return this.http.get(this.apiUrl, { params });
    const urlWithQuery = `${this.apiUrl}/${query}`;
    //                                  /${query}
    return this.http.get(urlWithQuery);
  }
}
