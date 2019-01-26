import {Observable, throwError} from 'rxjs';
import {map, catchError} from "rxjs/operators";
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {RequestOptions, Request, RequestOptionsArgs, Response, Headers, ResponseContentType} from '@angular/http';
import {LoaderService} from '../components/loader/loader.service';
import {GlobalMessageService} from '../components/globalMessage/globalMessage.service';
import {GlobalMessageType, CssBoxType} from '../components/globalMessage/globalMessage';
import {HttpPacket} from '../model/httpPacket';
import {HttpPacketResponseStatus} from '../model/httpPacketResponseStatus';
import {TranslateService} from '@ngx-translate/core';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class HttpService {

    private httpPacket: HttpPacket;
    httpOptions = {};

    constructor (options: RequestOptions,
        private router: Router,
        private translate: TranslateService,
        private loaderService: LoaderService,
        private loadingBarService: LoadingBarService,
        private globalMessageService : GlobalMessageService,
        private http: HttpClient) {

        this.httpOptions = {
            headers: this.getHttpHeaders()
        };
    }

    getHttpHeaders() : HttpHeaders {
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json'
        });
        return headers;
    }

    post(url: string, body: any) {
        this.loadingBarService.start();
        return this.http.post( url, body, this.httpOptions )
            .pipe(map(this.statusHandler(this)))
            .pipe(catchError(this.errorHandler(this)));
    }

    get(url: string, options?: Headers){
        this.loadingBarService.start();
        return this.http.get(url, this.httpOptions)
            .pipe(map(this.statusHandler(this)))
            .pipe(catchError(this.errorHandler(this)));
    }

    put(url: string, body: any, options?: Headers){
        this.loadingBarService.start();
        return this.http.put( url, body, this.httpOptions)
            .pipe(map(this.statusHandler(this)))
            .pipe(catchError(this.errorHandler(this)));
    }

    delete(url: string, options?: Headers) {
        this.loadingBarService.start();
        return this.http.delete(url, this.httpOptions)
            .pipe(map(this.statusHandler(this)))
            .pipe(catchError(this.errorHandler(this)));
    }

    download(url: string) {
        this.loadingBarService.start();
        return this.http.get(url, {responseType:'blob'})
            .pipe(map(this.responseDownload(this)))
            .pipe(catchError(this.errorHandler(this)));
    }

    // This method parses the data to JSON
    private responseDownload(self: HttpService) {
         return response => {
             this.loadingBarService.complete();
             return response;
         }
    }

    // This method parses the data to JSON
    private statusHandler(self: HttpService) {
        return (response: any) => {
            return response;
        };
    }

    // This method parses the data to JSON
    private statusHandlerOld(self: HttpService) {

         return (response: HttpPacket) => {

            this.loadingBarService.complete();

            this.httpPacket = response;

            if (HttpPacketResponseStatus.Error === this.httpPacket.status) {
                this.translate.get('apiExceptions.message.Error').subscribe((message: string) => {
                    this.globalMessageService.showMessage(message, GlobalMessageType.Error, null);
                });

                return throwError( response );
            }

            else if (HttpPacketResponseStatus.InvalidData === this.httpPacket.status) {
                let messages = [];
                messages.push(this.httpPacket.message);

                this.translate.get('message.title.modal-invalid-data').subscribe((title: string) => {
                    this.globalMessageService.showMessages(messages, GlobalMessageType.Error, title);
                });

                return throwError( response );
            }

            else if (HttpPacketResponseStatus.InvalidModel === this.httpPacket.status) {
                let messages = [];
                this.httpPacket.data.forEach(element => {
                    messages.push(element.value);
                });
                this.handleInvalidModel(messages);

                return throwError( response );
            }

            else if (HttpPacketResponseStatus.InvalidPrivilege === this.httpPacket.status) {
                this.router.navigate(['/error403'], {
                    skipLocationChange : true
                });
                return throwError( response );
            }

            else if (HttpPacketResponseStatus.LoginRequired === this.httpPacket.status) {
                this.translate.get('apiExceptions.message.LoginRequired').subscribe((message: string) => {
                    this.globalMessageService.showMessage(message, GlobalMessageType.Error, null);
                });
            }

            else if (HttpPacketResponseStatus.NotAuthenticated === this.httpPacket.status) {
                this.translate.get('apiExceptions.message.NotAuthenticated').subscribe((message: string) => {
                    this.globalMessageService.showMessage(message, GlobalMessageType.Error, null);
                });
            }

            else if (HttpPacketResponseStatus.ExpiredPassword === this.httpPacket.status) {
                this.translate.get('apiExceptions.message.ExpiredPassword').subscribe((message: string) => {
                    this.globalMessageService.showMessage(message, GlobalMessageType.Error, null);
                });
            }

            else if (HttpPacketResponseStatus.LoginLocked === this.httpPacket.status) {
                this.translate.get('apiExceptions.message.LoginLocked').subscribe((message: string) => {
                    this.globalMessageService.showMessage(message, GlobalMessageType.Error, null);
                });
            }

            else if (HttpPacketResponseStatus.ConstraintViolation === this.httpPacket.status) {
                this.translate.get('apiExceptions.message.ConstraintViolation').subscribe((message: string) => {
                    this.globalMessageService.showMessage(message, GlobalMessageType.Error, null);
                });
            }

            return response;
         }
    }

    errorDownload(self: HttpService) {
        return (response: Response) => {
            this.loadingBarService.complete();
            return throwError(response);
        }
    }

    errorHandler(self: HttpService) {

        return (res: Response) => {

            this.loadingBarService.complete();

            if (res.status === 401 || res.status === 403) {
                self.router.navigate(['/login'], {
                    skipLocationChange : true
                });
                let expiredLogin;
                this.translate.get('message.error.expired-login').subscribe((message: string) => {
                    expiredLogin = message;
                    this.globalMessageService.showMessage(message, GlobalMessageType.Error, null);
                });
                return throwError(expiredLogin);

            }
            else if (res.status === 404) {
                self.router.navigate(['/error404'], {
                    skipLocationChange : true
                });

                // Mensagem apenas para console
                return throwError( 'Página não encontrada.' );

            }
            else if (res.status === 0) {
                let serverNotFound;
                this.translate.get('message.error.server-notfound').subscribe((message: string) => {
                    serverNotFound = message;
                    this.globalMessageService.showMessage(message, GlobalMessageType.Error, null);
                });
                return throwError(serverNotFound);
            }

            return throwError(res);

        };
    }

    public handleInvalidModel(messages) {
        this.translate.get('message.title.modal-invalid-model').subscribe((title: string) => {
            this.globalMessageService.showMessages(messages, GlobalMessageType.Error, title);
        });
    }

}
