import {Directive, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {GlobalMessageService} from '../components/globalMessage/globalMessage.service';

@Directive({
  selector: '[appConfirmMessage]'
})
export class ConfirmMessageDirective {

  constructor (private globalMessageService : GlobalMessageService) {}

  @Output('onConfirm') onConfirm : EventEmitter<any> = new EventEmitter();
  @Output('onCancel') onCancel : EventEmitter<any> = new EventEmitter();
  
  @Input('confirmMessage') message : string;  
  @Input('confirmTitle') title : string;

  @HostListener('click') onClick() {
    this.globalMessageService.showConfirmMessage(this.message, this.title, this.onConfirm, this.onCancel);
  }
  
}
