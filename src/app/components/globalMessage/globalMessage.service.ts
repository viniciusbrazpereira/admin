import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../modal/modal.component';
import {ConfirmComponent} from '../modal/confirm.component';
import {GlobalMessage, GlobalMessageType, CssBoxType, CssIconType} from './globalMessage';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class GlobalMessageService {
    private subject = new Subject<GlobalMessage>();
    private onConfirmMessageSubject = new Subject<GlobalMessage>();
    private keepAfterRouteChange = false;
    private globalMessage = new GlobalMessage();


    private alertMessage: string;
    private informationMessage: string;
    private errorMessage: string;
    private warningMessage: string;
    private successMessage: string;

    constructor(
        private ngbModal: NgbModal,
        private translate: TranslateService) {}

    init(){
        this.translate.get('message.title.alert').subscribe((label: string) => {
            this.alertMessage = label;
        });

        this.translate.get('message.title.success').subscribe((label: string) => {
            this.successMessage = label;
        });

        this.translate.get('message.title.error').subscribe((label: string) => {
            this.errorMessage = label;
        });

        this.translate.get('message.title.informative').subscribe((label: string) => {
            this.informationMessage = label;
        });

        this.translate.get('message.title.warning').subscribe((label: string) => {
            this.warningMessage = label;
        });
    }    

    getGlobalMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    getGlobalConfirmMessage(): Observable<any> {
        return this.onConfirmMessageSubject.asObservable();
    }

    showMessage(message: string, globalMessageType : GlobalMessageType, title) {
        this.init();
        
        if (!message && !globalMessageType) {
            return;
        }

        let messages = [];
        messages.push(message);

        if(title) {
            this.showMessages(messages, globalMessageType, title);
            return;
        }

        if(globalMessageType == GlobalMessageType.Success){
            this.success(messages);
        }

        if(globalMessageType == GlobalMessageType.Error){
            this.error(messages);
        }

        if(globalMessageType == GlobalMessageType.Info){
            this.info(messages);
        }

        if(globalMessageType == GlobalMessageType.Warning){
            this.warn(messages);
        }

        if(globalMessageType == GlobalMessageType.default){
            this.default(messages);
        }
    }

    private success(messages: string[]) {
        this.globalMessage.type = GlobalMessageType.Success;
        this.globalMessage.messages = messages;
        this.globalMessage.showMessage = true;
        this.globalMessage.cssStyle = CssBoxType.SUCCESS;
        this.globalMessage.title = this.successMessage;
        this.globalMessage.icon = CssIconType.SUCCESS;

        this.globalMessageNext(this.globalMessage);
    }

    private error(messages: string[]) {
        this.globalMessage.type = GlobalMessageType.Error;
        this.globalMessage.messages = messages;
        this.globalMessage.showMessage = true;
        this.globalMessage.cssStyle = CssBoxType.DANGER;
        this.globalMessage.title = this.errorMessage;
        this.globalMessage.icon = CssIconType.DANGER;

        this.globalMessageNext(this.globalMessage);
    }

    private info(messages: string[]) {
        this.globalMessage.type = GlobalMessageType.Info;
        this.globalMessage.messages = messages;
        this.globalMessage.showMessage = true;
        this.globalMessage.cssStyle = CssBoxType.INFO;
        this.globalMessage.title = this.informationMessage;
        this.globalMessage.icon = CssIconType.INFO;

        this.globalMessageNext(this.globalMessage);

    }

    private warn(messages: string[]) {
        this.globalMessage.type = GlobalMessageType.Warning;
        this.globalMessage.messages = messages;
        this.globalMessage.showMessage = true;
        this.globalMessage.cssStyle = CssBoxType.WARNING;
        this.globalMessage.title = this.warningMessage;
        this.globalMessage.icon = CssIconType.WARNING;

        this.globalMessageNext(this.globalMessage);
    }

    private default(messages: string[]) {
        this.globalMessage.type = GlobalMessageType.Warning;
        this.globalMessage.messages = messages;
        this.globalMessage.showMessage = true;
        this.globalMessage.cssStyle = CssBoxType.DEFAULT;
        this.globalMessage.title = this.alertMessage;
        this.globalMessage.icon = CssIconType.DEFAULT;

        this.globalMessageNext(this.globalMessage);
    }

    globalMessageNext(globalMessageTemp : GlobalMessage) {
        this.subject.next(globalMessageTemp);
    }

    globalConfirmMessage(globalMessageTemp : GlobalMessage) {
        this.onConfirmMessageSubject.next(globalMessageTemp);
    }

    clear() {
        this.subject.next();
        this.onConfirmMessageSubject.next();
    }

    public showMessages(messages: string[], cssBoxType, title: string) {
        if(!messages) {
          return ;
        }
        
        if(cssBoxType == GlobalMessageType.Error) {
            this.globalMessage.cssStyle = CssBoxType.DANGER;
            this.globalMessage.icon = CssIconType.DANGER;
        }

        if(cssBoxType == GlobalMessageType.default) {
            this.globalMessage.cssStyle = CssBoxType.DEFAULT;
            this.globalMessage.icon = CssIconType.DEFAULT;
        }

        if(cssBoxType == GlobalMessageType.Info) {
            this.globalMessage.cssStyle = CssBoxType.INFO;
            this.globalMessage.icon = CssIconType.INFO;
        }

        if(cssBoxType == GlobalMessageType.Success) {
            this.globalMessage.cssStyle = CssBoxType.SUCCESS;
            this.globalMessage.icon = CssIconType.SUCCESS;
        }

        if(cssBoxType == GlobalMessageType.Warning) {
            this.globalMessage.cssStyle = CssBoxType.WARNING;
            this.globalMessage.icon = CssIconType.WARNING;
        }

        this.globalMessage.messages = messages;
        this.globalMessage.title = title;
        this.globalMessageNext(this.globalMessage);
    }

    //Caso for evocar o método sem usar a directive fazer a implementação igualmente abaixo:
    //let saveEventEmitter = new EventEmitter<any>();
    //saveEventEmitter.subscribe( data => {
        //this.save();
    //});
    public showConfirmMessage(message: string, title: string, onConfirm, onCancel?) {
        if (!message) {
            return;
        }

        this.defaultConfimMessage(message, title, onConfirm, onCancel);        
    }

    private defaultConfimMessage(message: string, title: string, onConfirm, onCancel) {

        this.globalMessage.type = GlobalMessageType.default;
        this.globalMessage.message = message;
        this.globalMessage.showMessage = true;
        this.globalMessage.cssStyle = CssBoxType.DEFAULT;
        this.globalMessage.title = this.alertMessage;
        this.globalMessage.icon = CssIconType.DEFAULT;
        this.globalMessage.onConfirm = onConfirm;
        this.globalMessage.onCancel = onCancel;
        this.globalMessage.title = title;

        this.globalConfirmMessage(this.globalMessage);

    }
}
