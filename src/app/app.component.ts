import {Component} from '@angular/core';
import { Observable } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
 HttpXhrBackend,
} from '@angular/common/http';

export interface Food {
  	value: string;
  	viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
	title = 'admin';
  response: Observable<any>;

  constructor(private translate: TranslateService,
              private backend: HttpXhrBackend) {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('pt_BR');

       // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('pt_BR');

      const req = new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts/1');
      this.response = this.backend.handle(req);
  }

	foods: Food[] = [
	    {value: 'steak-0', viewValue: 'Steak'},
	    {value: 'pizza-1', viewValue: 'Pizza'},
	    {value: 'tacos-2', viewValue: 'Tacos'}
	];
}
