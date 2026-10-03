import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private requestCount = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.requestCount === 0) {
      this.loadingService.setLoading(true);
    }
    this.requestCount++;

    return next.handle(req).pipe(
      finalize(() => {
        this.requestCount--;
        if (this.requestCount === 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}