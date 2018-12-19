// Angular Core
import {NgModule, ErrorHandler, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateService, TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LoadingBarModule, LoadingBarService} from '@ngx-loading-bar/core';
//import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
//import {LoadingBarHttpModule} from '@ngx-loading-bar/http';
import {NgbModule, NgbDatepickerI18n, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Router} from '@angular/router';

import {MatSelectModule} from '@angular/material';

// Autenticação/Autorização
import {AuthenticationService} from './services/authentication.service';

import {HttpInterceptingHandler} from "./handler/HttpInterceptingHandler"
import {AdminRoutingModule} from "./app.routing";

import {AppComponent} from './app.component';

import {AngularFontAwesomeModule} from 'angular-font-awesome';

import { HomeComponent } from "./shared/home/home.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { HeaderComponent } from "./shared/header/header.component";
import { ContentComponent } from "./shared/content/content.component";

import { SiteHomeComponent } from "./site/home/home.component";
import { SiteHeaderComponent } from "./site/header/header.component";
import { SiteContentComponent } from "./site/content/content.component";
import { SiteContactComponent } from "./site/contact/contact.component";

import { LoginComponent } from './modules/login/login.component';

// Loader
import { LoaderService } from './components/loader/loader.service';
import { LoaderComponent } from './components/loader/loader.component';

// Mensagem
import { GlobalMessageService } from './components/globalMessage/globalMessage.service';
import { GlobalMessageComponent } from './components/globalMessage/globalMessage.component';

// Serviços
import { HttpService } from './services/httpService.service';
//import { DomainService } from './services/domain.service';
//import { LayoutService } from './services/layout.service';
//import { ProcessService } from './services/process.service';
//import { WorkflowService } from './services/workflow.service';

/* Datepicker Custom */
import {CustomDatepickerI18n, I18n} from  './components/datepicker/custom.datepickerI18n';
import {NgbDatePTBRParserFormatter} from  './components/datepicker/NgbDatePTBRParserFormatter';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/* Http Service */
export function httpService(
    options: RequestOptions,
    router: Router,
    translate: TranslateService,
    loaderService: LoaderService,
    loadingBarService: LoadingBarService,
    globalMessageService: GlobalMessageService,
    http: HttpClient) {

    return new HttpService(options, router, translate, loaderService, loadingBarService, globalMessageService, http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    ContentComponent,
    SiteHomeComponent,
    SiteHeaderComponent,
    SiteContentComponent,
    SiteContactComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
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
    AuthenticationService,
    LoadingBarService,
    LoaderService,
    GlobalMessageService,
    TranslateService,
    {
          provide: HttpService,
          useFactory: httpService,
          deps: [
            RequestOptions,
            Router,
            TranslateService,
            LoaderService,
            LoadingBarService,
            GlobalMessageService,
            HttpClient
          ]
    },
    { provide: LOCALE_ID, useValue: 'pt_BR' },
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
