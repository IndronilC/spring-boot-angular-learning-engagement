import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class jwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  intercept(
  req: HttpRequest<any>,
  next: HttpHandler
): Observable<HttpEvent<any>> {

  // ✅ 1. Skip refresh API (VERY IMPORTANT)
  if (req.url.includes('/auth/refresh')) {
    return next.handle(req);
  }

  // ✅ 2. Attach access token to normal requests
  const accessToken = this.authService.getAccessToken();

  let authReq = req;

  if (accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  // ✅ 3. Handle response
  return next.handle(authReq).pipe(

    catchError(error => {

      // ✅ 4. If 401 → try refresh
      if (error.status === 401) {
        return this.handle401Error(authReq, next);
      }

      return throwError(() => error);
    })
  );
}

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const refreshToken = this.authService.getRefreshToken();

    return this.http.post<any>('http://localhost:9090/api/v1/auth/refresh', {
      refreshToken: refreshToken
    }).pipe(
      switchMap(response => {

        this.authService.setTokens(
          response.accessToken,
          response.refreshToken
        );

        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${response.accessToken}`
          }
        });

        return next.handle(newRequest);
      }),
      catchError(err => {
        this.authService.clear();
        return throwError(() => err);
      })
    );
  }
}