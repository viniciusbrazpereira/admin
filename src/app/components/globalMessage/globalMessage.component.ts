import {Component, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs';

import {GlobalMessage, GlobalMessageType } from './globalMessage';
import {GlobalMessageService} from './globalMessage.service';

@Component({
    selector: 'app-global-message',
    templateUrl: './globalMessage.component.html'
})
export class GlobalMessageComponent implements OnInit, OnDestroy {

    globalMessages: GlobalMessage[] = [];

    showConfirmMessage : boolean;
    showMessage : boolean;
    title : string;
    message : string;
    messages : string[];

    cssStyle: string;
    icon: string;

    onConfirmEvent: EventEmitter<any>;
    onCancelEvent: EventEmitter<any>;

    private onMessageListener: Subscription;
    private onConfirListener: Subscription;

    constructor(private globalMessageService : GlobalMessageService) {
        this.globalMessageService = globalMessageService;
        this.showConfirmMessage = false;
        this.showMessage = false;
        this.message = "";
    }

    ngOnInit() {
        this.onMessageListener = this.globalMessageService.getGlobalMessage().subscribe((globalMessage: GlobalMessage) => {
            if (!globalMessage) {
                this.globalMessages = [];
                return;
            }
            
            this.showMessage = true;
            this.title = globalMessage.title;
            this.cssStyle = globalMessage.cssStyle;
            this.icon = globalMessage.icon;
            this.messages = globalMessage.messages;
        });

        this.onConfirListener = this.globalMessageService.getGlobalConfirmMessage().subscribe((globalMessage: GlobalMessage) => {

            if (!globalMessage) {
                return;
            }

            this.showConfirmMessage = true;
            this.message = globalMessage.message;
            this.title = globalMessage.title;
            this.onConfirmEvent = globalMessage.onConfirm;
            this.onCancelEvent = globalMessage.onCancel;

        });
    }

    ngOnDestroy() {
        this.onMessageListener.unsubscribe();
        this.onConfirListener.unsubscribe();
    }

    remove(globalMessage: GlobalMessage) {
        this.globalMessages = this.globalMessages. filter(x => x !== globalMessage);
    }

    onCancel() {
        this.showConfirmMessage = false;

        if (this.onCancelEvent) {
            this.onCancelEvent.emit();
        }
    }
    onConfirm(){
        this.showConfirmMessage = false;
        this.onConfirmEvent.emit();
    }
}
