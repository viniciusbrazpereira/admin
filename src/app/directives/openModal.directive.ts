import {Directive, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {GlobalMessageService} from '../components/globalMessage/globalMessage.service';
import {GlobalMessageType, CssBoxType} from '../components/globalMessage/globalMessage';

@Directive({
  selector: '[appOpenModal]'
})
export class OpenModalDirective {

  constructor(
      private globalMessageService: GlobalMessageService,
      private modalService: NgbModal) {}

  @Output('onOpenModal') onOpen : EventEmitter<any> = new EventEmitter();
  @Output('onCloseModal') onClose : EventEmitter<any> = new EventEmitter();
  @Input('modalContent') modalContent : any;

  @HostListener('click') onClick() {
    
    this.onOpen.emit();

    this.modalService.open(this.modalContent, { size: 'lg' }).result.then((result) => {
        this.onClose.emit(result);
    }, (reason) => {
        this.onClose.emit(reason);
    });

  }
}
