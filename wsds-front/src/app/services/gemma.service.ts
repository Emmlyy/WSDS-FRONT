import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GemmaService {
  private apiUrl = 'http://127.0.0.1:8000';
  // http://127.0.0.1:8000/global
  //http://localhost:3000
  constructor(private http: HttpClient) {}
  searchData(search: string, date_start: string, date_end: string): Observable<any> {
    let urlWithQuery = ""
    if( date_start == "" || date_end ==""){
      urlWithQuery = `${this.apiUrl}/model_gemma?search=${search}`;
    }else{
      urlWithQuery = `${this.apiUrl}/model_gemma?search=${search}&date_start=${cambiarFormatoFecha(date_start)}&date_end=${cambiarFormatoFecha(date_end)}`;
    //localhost:8000/model_gemma?search=Homicidio&date_start=2024-04-01&date_end=2024-05-01
    }


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
}

export interface News {
  date: string;
  sheet_id: string;
  source: string;
  tag: string;
  title: string;
  text: string;
  url: string;
}

export interface new_url {
  url: string;
}

function cambiarFormatoFecha(fecha: string): string {
  const fechaObjeto: Date = new Date(fecha);

  const año: number = fechaObjeto.getFullYear();
  const mes: number = fechaObjeto.getMonth() + 1; // Se suma 1 porque los meses en JavaScript van de 0 a 11
  const dia: number = fechaObjeto.getDate();

  // Formatear la fecha en el formato deseado (YYYY-MM-DD)
  const fechaFormateada: string = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

  return fechaFormateada;

}
