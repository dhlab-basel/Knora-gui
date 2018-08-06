import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import * as momentImported from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { KuiCoreModule } from '../../core.module';
import { ApiServiceError, ApiServiceResult, CurrentUser, KnoraConstants, KuiCoreConfig, User } from '../../declarations';
import { AuthenticationCacheService } from './authentication-cache.service';
import { UsersService } from './users.service';


const moment = momentImported;

@Injectable({
    providedIn: KuiCoreModule
})
export class AuthenticationService {

    constructor(private _http: HttpClient,
                private _acs: AuthenticationCacheService,
                private _usersService: UsersService,
                @Inject('config') public config: KuiCoreConfig) {
    }

    login(username: string, password: string) {

        let currentUser: CurrentUser = new CurrentUser();

        return this._http.post<any>(this.config.api + '/v2/authentication', {email: username, password: password})
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response

                if (res && res.token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify({username, token: res.token}));

                    // store a new user key in local storage
                    const key = moment().add(0, 'second');
                    localStorage.setItem('session_id', JSON.stringify(key.valueOf()));

                    this._usersService.getUserByEmail(username).subscribe(
                        (result: User) => {
                            let sysAdmin: boolean = false;

                            const permissions = result.permissions;
                            if (permissions.groupsPerProject[KnoraConstants.SystemProjectIRI]) {
                                sysAdmin = permissions.groupsPerProject[KnoraConstants.SystemProjectIRI].indexOf(KnoraConstants.SystemAdminGroupIRI) > -1;
                            }

                            currentUser = {
                                email: username,
                                token: res.token,
                                lang: result.lang,
                                sysAdmin: sysAdmin
                            };

                            console.log('our key', JSON.stringify(key.valueOf()));
                            console.log('cache has key?', this._acs.has(JSON.stringify(key.valueOf())));

                            // set the currentUser in the cache service
                            this._acs.set(JSON.stringify(key.valueOf()), currentUser);

                        },
                        (error: ApiServiceError) => {
                            console.error(error);
                        }
                    );
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        // localStorage.removeItem('currentUser');

        // from https://blog.angular-university.io/angular-jwt-authentication/
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // end angular-university.io
    }

    authenticate(): Observable<boolean> {
        return this._http.get('/v2/authentication').pipe(
            map((result: ApiServiceResult) => {

                console.log('authenticate', result);
                // return true || false
                return result.status === 200;
            })
        );
    }
}