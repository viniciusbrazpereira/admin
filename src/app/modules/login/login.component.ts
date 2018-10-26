import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector : 'login',
    templateUrl : './login.component.html'
})
export class LoginComponent implements OnInit {

    username = '';
    password = '';
    token = '';

    ngOnInit() {

    }

    login(event) {

     }

     public showMessage(message) {

     }

}
