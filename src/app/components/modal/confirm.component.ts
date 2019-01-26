import { Component, Input , EventEmitter, Output} from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal-content',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent {
  @Output() confirmed: EventEmitter<any> = new EventEmitter();

  @Input() messageAlert: String;
  @Input() alertType: string;

  @Input() title: String;
  @Input() message: String;
  @Input() boxType: String;

  constructor(public activeModal: NgbActiveModal) {}

  onConfirmed() {
    this.activeModal.dismiss();
    this.confirmed.emit();
  }
}
