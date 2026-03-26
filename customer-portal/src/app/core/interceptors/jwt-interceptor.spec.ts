import { TestBed } from '@angular/core/testing';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';

import { jwtInterceptor } from './jwt-interceptor';

describe('JwtInterceptor', () => {

  let interceptor: jwtInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [jwtInterceptor]
    });

    interceptor = TestBed.inject(jwtInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header', (done) => {

    const req = new HttpRequest('GET', '/test');

    const next: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        expect(request.headers.has('Authorization')).toBeTruthy();
        done();
        return of({} as HttpEvent<any>);
      }
    };

    interceptor.intercept(req, next).subscribe();
  });

});
