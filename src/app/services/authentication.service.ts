import {Injectable} from '@angular/core';
import {Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import {map} from "rxjs/operators";

import {environment} from '../../environments/environment';
import {UserData} from '../model/userData';
import {HttpService} from '../services/httpService.service';

@Injectable()
export class AuthenticationService {

    public url: string = environment.url;

    constructor (private http: HttpService) {}

    login(username: string, password: string): Observable<any> {
        return this.http.post(
              this.url + '/authentication',
              {username: username, password: password})
              .pipe(map((res: any) => {
                  //localStorage.setItem('authorities', res.data.authorities);
                  //localStorage.setItem('username', res.data.user.login);
                  //localStorage.setItem('profile', res.data.user.profile);
                  if (res.token != null) {
                    localStorage.setItem('username', res.login);
                    localStorage.setItem('token', res.token);
                  }

                  return res;

        }));
   }

   hasPermission(permission: string): boolean {
       return (localStorage.getItem('authorities').includes(permission));
   }

   logout(): void {
       //localStorage.removeItem('authorities');
       localStorage.removeItem('username');
       //localStorage.removeItem('profile');
       localStorage.removeItem('token');

       localStorage.clear();
   }

   getUser(): UserData {
      let userData = new UserData();

      userData.username = localStorage.getItem('username');
      //userData.profile = localStorage.getItem('profile');
      userData.token = localStorage.getItem('token');
      //userData.authorities = localStorage.getItem('authorities').split(",");

      return userData;
   }
}
