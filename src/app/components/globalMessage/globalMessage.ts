import {EventEmitter} from '@angular/core';

export class GlobalMessage {
    type: GlobalMessageType;
    message: string;
    messages: string[];
    showMessage : boolean;
    cssStyle: string;
    title: string;
    icon: string;
    onConfirm: EventEmitter<any>;
    onCancel: EventEmitter<any>;
}

export enum GlobalMessageType {
    Success,
    default,
    Error,
    Info,
    Warning
}

 /* CSS Style do Joli Dashboard */
export const CssBoxType = {
    DEFAULT : "message-box",
    INFO : "message-box message-box-info",
    DANGER : "message-box message-box-danger",
    WARNING : "message-box message-box-warning",
    SUCCESS : "message-box message-box-success"
};

/* CSS Style Icon do Joli Dashboard */
export const CssIconType = {
    DEFAULT : "fa fa-globe",
    INFO : "fa fa-info",
    DANGER : "fa fa-times",
    WARNING : "fa fa-warning",
    SUCCESS : "fa fa-check"
};