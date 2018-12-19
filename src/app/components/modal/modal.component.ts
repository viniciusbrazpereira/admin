import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
    @Input() title: String;
    @Input() messages: String[];
    @Input() boxType: String;

    constructor(public activeModal: NgbActiveModal) {}
}
