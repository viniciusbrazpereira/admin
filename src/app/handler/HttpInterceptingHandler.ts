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
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let dupReq = req.clone({
          headers: req.headers.set('key', 'DCtbqRXC8L'),
      });
      console.log("PAssou aqui");
      return next.handle(dupReq);
    }
}
