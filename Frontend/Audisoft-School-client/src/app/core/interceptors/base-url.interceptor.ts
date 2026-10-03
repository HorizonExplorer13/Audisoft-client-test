import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith('http') || req.url.startsWith('/assets')) {
      return next.handle(req);
    }

    const apiUrl = environment.apiUrl || '';
    const apiReq = req.clone({
      url: `${apiUrl}${req.url.startsWith('/') ? '' : '/'}${req.url}`,
    });

    return next.handle(apiReq);
  }
}