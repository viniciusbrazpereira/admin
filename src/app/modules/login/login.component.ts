import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';

@Component({
    selector : 'login',
    templateUrl : './login.component.html'
})
export class LoginComponent implements OnInit {

    username = '';
    password = '';
    token = '';

    loginForm: FormGroup;

    constructor(
      private _router: Router,
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService){
        this.loginForm = this.formBuilder.group({
           username: new FormControl('', Validators.required),
           password: new FormControl('', Validators.required)
         });
      }

    ngOnInit() {

    }

    login(event) {
        this.authenticationService.login(
          this.loginForm.get('username').value,
          this.loginForm.get('password').value).subscribe(result => {
              if (result.token != null) {
                   this._router.navigate(['/home']);
              }
            console.log(result);
        }, erro => {
            console.error(erro);
        });
     }

     public showMessage(message) {

     }

}
