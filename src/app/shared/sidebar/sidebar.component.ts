import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, ActivatedRoute, NavigationEnd} from '@angular/router';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';
//import { UserData } from '../../model/userData';
//import { AuthenticationService } from '../../services/authentication.service';
//import { GlobalEventService, GlobalEventName } from '../../services/globalEvent.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        //private authService: AuthenticationService
        //private authenticationService: AuthenticationService,
        ) {
    }

    //userData: UserData;
    version: String = environment.version;

    ngOnInit() {
        //this.userData = this.authService.getUser();
    }

    openlogout(){
        //GlobalEventService.emit(GlobalEventName.ON_LOGOUT, null);
    }

    /*
    layoutPermissionViewLink(){
        let isPermitted = false;
        this.activatedRoute.data.subscribe((params) => {
            params['layoutPermissionViewLink'].forEach(element => {
                if(this.authenticationService.hasPermission(element)){
                    isPermitted = true;
                }
            });
        });
        return isPermitted;
    }

    processPermissionViewLink(){
        let isPermitted = false;
        this.activatedRoute.data.subscribe((params) => {
            params['processPermissionViewLink'].forEach(element => {
                if(this.authenticationService.hasPermission(element)){
                    isPermitted = true;
                }
            });
        });
        return isPermitted;
    }

    approvalPermissionViewLink(){
        let isPermitted = false;
        this.activatedRoute.data.subscribe((params) => {
            params['approvalPermissionViewLink'].forEach(element => {
                if(this.authenticationService.hasPermission(element)){
                    isPermitted = true;
                }
            });
        });
        return isPermitted;
    }

    pluginPermissionViewLink(){
        let isPermitted = false;
        this.activatedRoute.data.subscribe((params) => {
            params['pluginPermissionViewLink'].forEach(element => {
                if(this.authenticationService.hasPermission(element)){
                    isPermitted = true;
                }
            });
        });
        return isPermitted;
    }
    */

}
