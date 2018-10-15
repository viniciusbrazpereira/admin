import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class HttpInterceptingHandler implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let dupRequest = request.clone({
          headers: request.headers.set('key', 'DCtbqRXC8L'),
      });
      return next.handle(dupRequest);
    }
}
