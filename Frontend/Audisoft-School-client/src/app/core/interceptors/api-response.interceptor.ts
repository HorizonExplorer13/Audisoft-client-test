import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  errors: string[];
}

export class ApiError extends Error {
  constructor(
    message: string,
    public errors: string[] = [],
    public status: number = 0
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

@Injectable()
export class ApiResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          const apiResponse = event.body as ApiResponse<unknown>;
          if (apiResponse && typeof apiResponse.success === 'boolean') {
            if (!apiResponse.success) {
              throw new ApiError(apiResponse.message, apiResponse.errors, event.status);
            }
            return event.clone({ body: apiResponse.data });
          }
        }
        return event;
      }),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error && typeof error.error.success === 'boolean' && !error.error.success) {
            return throwError(() => new ApiError(
              error.error.message || 'Error en la petición',
              error.error.errors || [],
              error.status
            ));
          }
          if (error.status === 0) {
            return throwError(() => new ApiError('No se puede conectar al servidor', [], 0));
          }
        }
        if (error instanceof ApiError) {
          return throwError(() => error);
        }
        return throwError(() => new ApiError('Error inesperado', [], 500));
      })
    );
  }
}