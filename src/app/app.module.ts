import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {RouterModule} from '@angular/router';
import {HttpInterceptingHandler} from "./handler/HttpInterceptingHandler"
import {AdminRoutingModule} from "./app.routing";

import {AppComponent} from './app.component';

import {AngularFontAwesomeModule} from 'angular-font-awesome';

import { HomeComponent } from "./shared/home/home.component";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AdminRoutingModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptingHandler, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
