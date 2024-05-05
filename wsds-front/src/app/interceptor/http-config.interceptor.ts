// src/app/http-config.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import {LoaderService} from "../services/loader.service";


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.loaderService.hide();
        return throwError(error);
      }),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}
